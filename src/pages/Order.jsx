import { useState, useEffect, useRef } from 'react';
import { ShoppingCart, Clock, MapPin, Plus, Minus, X, Trash2, Phone, CreditCard, CheckCircle, AlertCircle } from 'lucide-react';
import { menuData } from '../data';
import { useCart } from '../context/CartContext';

const PICKUP_INFO = {
    location: 'Parksville, BC',
    hours: 'Wed – Sat, 11am – 3pm',
    leadTime: '24-hour advance order recommended',
    phone: '(250) 000-0000',
};

const fmt = (cents) => `$${(cents / 100).toFixed(2)}`;
const normalize = (s) => s.toLowerCase().trim().replace(/[^a-z0-9]/g, '');

// ── Checkout Modal ────────────────────────────────────────────────────────────
const CheckoutModal = ({ onClose }) => {
    const { cartItems, cartTotal, clearCart } = useCart();
    const cardRef = useRef(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('idle'); // idle | loading | success | error
    const [errorMsg, setErrorMsg] = useState('');

    useEffect(() => {
        if (!window.Square) {
            setErrorMsg('Square payment SDK not loaded. Please refresh and try again.');
            return;
        }
        const appId = import.meta.env.VITE_SQUARE_APPLICATION_ID;
        const locationId = import.meta.env.VITE_SQUARE_LOCATION_ID;
        if (!appId || !locationId) {
            setErrorMsg('Payment is not configured yet. Contact us to place your order.');
            return;
        }

        let card;
        const init = async () => {
            try {
                const payments = window.Square.payments(appId, locationId);
                card = await payments.card({
                    style: {
                        '.input-container': { borderColor: 'rgba(26,17,13,0.2)', borderRadius: '4px' },
                        '.input-container.is-focus': { borderColor: '#c05621' },
                    },
                });
                await card.attach('#card-container');
                cardRef.current = card;
            } catch {
                setErrorMsg('Could not load payment form. Please refresh and try again.');
            }
        };
        init();
        return () => { card?.destroy?.(); };
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!cardRef.current) return;
        setStatus('loading');
        setErrorMsg('');

        try {
            const result = await cardRef.current.tokenize();
            if (result.status !== 'OK') {
                setStatus('error');
                setErrorMsg(result.errors?.[0]?.message ?? 'Card validation failed.');
                return;
            }

            const note = cartItems.map(i => `${i.qty}x ${i.name}`).join(', ') + ` | ${name} <${email}>`;
            const resp = await fetch('/.netlify/functions/square-payment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nonce: result.token, amountCents: cartTotal, note }),
            });
            const data = await resp.json();

            if (!resp.ok) {
                setStatus('error');
                setErrorMsg(data.error ?? 'Payment failed. Please try again.');
                return;
            }

            setStatus('success');
            clearCart();
        } catch {
            setStatus('error');
            setErrorMsg('Network error. Please check your connection and try again.');
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="bg-[#f4ebd0] w-full max-w-md rounded-3xl overflow-hidden shadow-2xl border-4 border-[#1a110d] lantern-container max-h-[90vh] flex flex-col">
                <div className="bg-[#152238] bg-denim-patch px-6 py-4 border-b-4 border-[#c05621] flex items-center justify-between shrink-0">
                    <h2 className="text-[#f4ebd0] font-bold uppercase tracking-widest text-sm flex items-center gap-2">
                        <CreditCard size={14} className="text-[#c05621] flame-1" /> Secure Checkout
                    </h2>
                    <button onClick={onClose} className="text-[#f4ebd0]/50 hover:text-[#f4ebd0] cursor-pointer transition-colors">
                        <X size={18} />
                    </button>
                </div>

                <div className="overflow-y-auto p-6 space-y-5">
                    {status === 'success' ? (
                        <div className="text-center py-8 space-y-4">
                            <CheckCircle size={48} className="text-[#c05621] mx-auto flame-1" />
                            <h3 className="text-xl font-bold text-[#1a110d]">Order Placed!</h3>
                            <p className="text-sm text-[#1a110d]/60">We'll be in touch at <strong>{email}</strong> with your pickup details.</p>
                            <button onClick={onClose} className="mt-4 px-8 py-3 bg-[#c05621] text-white font-bold uppercase tracking-widest rounded hover:bg-[#a84615] transition-colors cursor-pointer">
                                Done
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Order summary */}
                            <div className="bg-white rounded-xl border-2 border-[#1a110d]/10 p-4">
                                <p className="text-[10px] font-bold uppercase tracking-widest text-[#1a110d]/40 mb-3">Order Summary</p>
                                <div className="space-y-2">
                                    {cartItems.map(i => (
                                        <div key={i.variationId} className="flex justify-between text-sm text-[#1a110d]">
                                            <span>{i.qty}× {i.name}</span>
                                            <span className="font-bold">{fmt(i.priceCents * i.qty)}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="border-t border-dashed border-[#1a110d]/20 pt-2 mt-3 flex justify-between font-bold text-[#1a110d]">
                                    <span>Total</span>
                                    <span className="text-[#c05621] flame-2">{fmt(cartTotal)}</span>
                                </div>
                            </div>

                            {/* Contact */}
                            <div className="space-y-3">
                                <p className="text-[10px] font-bold uppercase tracking-widest text-[#1a110d]/40">Contact Info</p>
                                <input className="input-field" type="text" placeholder="Full Name" value={name} onChange={e => setName(e.target.value)} required />
                                <input className="input-field" type="email" placeholder="Email address" value={email} onChange={e => setEmail(e.target.value)} required />
                            </div>

                            {/* Card form */}
                            <div className="space-y-2">
                                <p className="text-[10px] font-bold uppercase tracking-widest text-[#1a110d]/40">Card Details</p>
                                <div id="card-container" className="bg-white border-2 border-[#1a110d]/20 rounded p-3 min-h-[80px]" />
                            </div>

                            {errorMsg && (
                                <div className="flex items-start gap-2 text-red-600 text-xs bg-red-50 border border-red-200 rounded p-3">
                                    <AlertCircle size={14} className="shrink-0 mt-0.5" />
                                    <span>{errorMsg}</span>
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={status === 'loading'}
                                className="w-full py-4 bg-[#c05621] text-white font-bold uppercase tracking-widest rounded hover:bg-[#a84615] transition-colors flame-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {status === 'loading' ? 'Processing…' : `Pay ${fmt(cartTotal)}`}
                            </button>

                            <p className="text-center text-[10px] text-[#1a110d]/40 uppercase tracking-widest">
                                Secured by Square · Pickup only · Parksville, BC
                            </p>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

// ── Cart Panel ────────────────────────────────────────────────────────────────
const CartPanel = ({ onClose, onCheckout }) => {
    const { cartItems, cartTotal, itemCount, addItem, removeItem } = useCart();

    return (
        <div className="fixed inset-0 z-50 flex justify-end">
            <div className="absolute inset-0 bg-black/50" onClick={onClose} />
            <div className="relative w-full max-w-sm bg-[#f4ebd0] border-l-4 border-[#1a110d] flex flex-col shadow-2xl animate-in">
                <div className="bg-[#152238] bg-denim-patch px-5 py-4 border-b-4 border-[#c05621] flex items-center justify-between shrink-0">
                    <h2 className="text-[#f4ebd0] font-bold uppercase tracking-widest text-sm flex items-center gap-2">
                        <ShoppingCart size={14} className="text-[#c05621]" /> Cart ({itemCount})
                    </h2>
                    <button onClick={onClose} className="text-[#f4ebd0]/50 hover:text-[#f4ebd0] cursor-pointer transition-colors">
                        <X size={18} />
                    </button>
                </div>

                {cartItems.length === 0 ? (
                    <div className="flex-1 flex flex-col items-center justify-center text-center p-8 space-y-3">
                        <ShoppingCart size={40} className="text-[#1a110d]/20" />
                        <p className="text-sm font-bold text-[#1a110d]/40 uppercase tracking-widest">Your cart is empty</p>
                        <button onClick={onClose} className="text-xs text-[#c05621] hover:underline cursor-pointer">Browse the menu</button>
                    </div>
                ) : (
                    <>
                        <div className="flex-1 overflow-y-auto p-5 space-y-3">
                            {cartItems.map(item => (
                                <div key={item.variationId} className="flex items-center gap-3 bg-white border-2 border-[#1a110d]/10 rounded-xl p-3">
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-bold text-[#1a110d] truncate">{item.name}</p>
                                        <p className="text-xs text-[#c05621] flame-2">{fmt(item.priceCents)} each</p>
                                    </div>
                                    <div className="flex items-center gap-1 shrink-0">
                                        <button onClick={() => removeItem(item.variationId)} className="w-7 h-7 rounded-full bg-[#1a110d]/10 flex items-center justify-center hover:bg-[#c05621] hover:text-white transition-colors cursor-pointer">
                                            {item.qty === 1 ? <Trash2 size={12} /> : <Minus size={12} />}
                                        </button>
                                        <span className="w-6 text-center text-sm font-bold text-[#1a110d]">{item.qty}</span>
                                        <button onClick={() => addItem(item)} className="w-7 h-7 rounded-full bg-[#1a110d]/10 flex items-center justify-center hover:bg-[#c05621] hover:text-white transition-colors cursor-pointer">
                                            <Plus size={12} />
                                        </button>
                                    </div>
                                    <span className="text-sm font-bold text-[#1a110d] w-16 text-right shrink-0">{fmt(item.priceCents * item.qty)}</span>
                                </div>
                            ))}
                        </div>

                        <div className="p-5 border-t-4 border-[#1a110d]/10 space-y-3 shrink-0">
                            <div className="flex justify-between text-base font-bold text-[#1a110d]">
                                <span>Subtotal</span>
                                <span className="text-[#c05621] flame-2">{fmt(cartTotal)}</span>
                            </div>
                            <p className="text-[10px] text-[#1a110d]/40 uppercase tracking-widest text-center">Pickup only · Parksville, BC</p>
                            <button
                                onClick={onCheckout}
                                className="w-full py-4 bg-[#c05621] text-white font-bold uppercase tracking-widest rounded hover:bg-[#a84615] transition-colors flame-2 cursor-pointer flex items-center justify-center gap-2"
                            >
                                <CreditCard size={16} /> Checkout
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

// ── Menu Card ─────────────────────────────────────────────────────────────────
const MenuCard = ({ item, catalogItem, compact }) => {
    const { addItem } = useCart();
    const variation = catalogItem?.variations?.[0];
    const hasPrice = variation && variation.priceCents > 0;

    const handleAdd = () => {
        if (!hasPrice) return;
        addItem({ id: catalogItem.id, variationId: variation.id, name: item.name, priceCents: variation.priceCents });
    };

    return (
        <div className={`bg-white border-2 border-[#1a110d]/20 rounded-2xl ${compact ? 'p-4' : 'p-5'} hover:border-[#c05621] hover:shadow-md transition-all flex flex-col gap-3`}>
            <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                    <h4 className={`font-bold text-[#1a110d] ${compact ? 'text-sm' : 'text-base'}`}>{item.name}</h4>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#c05621] mt-0.5 flame-2">{item.subtitle}</p>
                    {!compact && <p className="text-xs text-[#1a110d]/70 mt-2 leading-relaxed">{item.description}</p>}
                </div>
                {item.tag && (
                    <span className="shrink-0 text-[9px] bg-[#f4ebd0] border border-[#1a110d]/20 text-[#1a110d] font-bold px-2 py-0.5 rounded-full uppercase tracking-widest">
                        {item.tag}
                    </span>
                )}
            </div>
            <div className="flex items-center justify-between mt-auto">
                <span className="text-sm font-bold text-[#1a110d]">
                    {hasPrice
                        ? fmt(variation.priceCents)
                        : <span className="text-[#1a110d]/30 text-xs uppercase tracking-widest">Price TBD</span>}
                </span>
                <button
                    onClick={handleAdd}
                    disabled={!hasPrice}
                    className="flex items-center gap-1 px-3 py-1.5 bg-[#1a110d] text-[#f4ebd0] text-xs font-bold uppercase tracking-widest rounded hover:bg-[#c05621] transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                >
                    <Plus size={12} /> Add
                </button>
            </div>
        </div>
    );
};

// ── Order Page ────────────────────────────────────────────────────────────────
const Order = () => {
    const [catalogItems, setCatalogItems] = useState([]);
    const [catalogLoading, setCatalogLoading] = useState(true);
    const [catalogError, setCatalogError] = useState(null);
    const [cartOpen, setCartOpen] = useState(false);
    const [checkoutOpen, setCheckoutOpen] = useState(false);
    const { itemCount } = useCart();

    useEffect(() => {
        fetch('/.netlify/functions/square-catalog')
            .then(r => r.json())
            .then(data => {
                if (Array.isArray(data)) setCatalogItems(data);
                else setCatalogError('Could not load prices — items still available to order.');
            })
            .catch(() => setCatalogError('Could not load prices — items still available to order.'))
            .finally(() => setCatalogLoading(false));
    }, []);

    const findCatalogItem = (name) =>
        catalogItems.find(c => normalize(c.name) === normalize(name));

    const handleCheckout = () => {
        setCartOpen(false);
        setCheckoutOpen(true);
    };

    return (
        <div className="animate-in texture-burlap min-h-screen">
            {/* Floating cart button */}
            {itemCount > 0 && !cartOpen && !checkoutOpen && (
                <button
                    onClick={() => setCartOpen(true)}
                    className="fixed bottom-6 right-6 z-40 flex items-center gap-2 px-5 py-3 bg-[#c05621] text-white font-bold rounded-full shadow-2xl hover:bg-[#a84615] transition-colors flame-2 cursor-pointer border-2 border-white/20"
                >
                    <ShoppingCart size={18} />
                    <span className="text-sm uppercase tracking-widest">Cart ({itemCount})</span>
                </button>
            )}

            {cartOpen     && <CartPanel onClose={() => setCartOpen(false)} onCheckout={handleCheckout} />}
            {checkoutOpen && <CheckoutModal onClose={() => setCheckoutOpen(false)} />}

            {/* Header */}
            <div className="bg-[#1a110d] texture-wood border-b-8 border-[#152238] py-16 px-4 text-center text-[#f4ebd0]">
                <div className="flex items-center justify-center gap-3 mb-4">
                    <ShoppingCart size={28} className="text-[#c05621] flame-1" />
                    <h1 className="text-4xl md:text-5xl font-bold uppercase tracking-tighter text-shadow-wood">Order Now</h1>
                </div>
                <p className="text-[#f4ebd0]/60 max-w-lg mx-auto text-sm">
                    Add items to your cart and pay securely — pickup in Parksville.
                </p>
                <button
                    onClick={() => setCartOpen(true)}
                    className="inline-flex items-center gap-2 mt-8 px-10 py-4 bg-[#c05621] text-white font-bold uppercase tracking-widest rounded-xl text-sm hover:bg-[#a84615] transition-colors shadow-2xl flame-2 cursor-pointer"
                >
                    <ShoppingCart size={18} /> View Cart{itemCount > 0 ? ` (${itemCount})` : ''}
                </button>
            </div>

            {/* Info bar */}
            <div className="bg-[#f4ebd0] border-b-4 border-[#1a110d] py-5 px-4">
                <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    {[
                        { icon: MapPin, label: 'Location', value: PICKUP_INFO.location },
                        { icon: Clock,  label: 'Hours',    value: PICKUP_INFO.hours },
                        { icon: Clock,  label: 'Lead Time',value: PICKUP_INFO.leadTime },
                        { icon: Phone,  label: 'Phone',    value: PICKUP_INFO.phone },
                    ].map(({ icon: Icon, label, value }) => (
                        <div key={label}>
                            <div className="flex items-center justify-center gap-1 mb-1 text-[#c05621]">
                                <Icon size={12} />
                                <span className="text-[10px] font-bold uppercase tracking-widest text-[#1a110d]/50">{label}</span>
                            </div>
                            <p className="text-xs font-bold text-[#1a110d]">{value}</p>
                        </div>
                    ))}
                </div>
            </div>

            {catalogLoading && (
                <div className="text-center py-20 text-[#1a110d]/40 text-xs uppercase tracking-widest">Loading menu prices…</div>
            )}
            {catalogError && (
                <div className="max-w-4xl mx-auto px-4 pt-6">
                    <p className="text-xs text-center text-[#1a110d]/50 bg-[#1a110d]/5 border border-dashed border-[#1a110d]/20 rounded-xl px-4 py-3">
                        {catalogError}
                    </p>
                </div>
            )}

            <div className="max-w-5xl mx-auto px-4 py-12 space-y-14">
                <section>
                    <h3 className="text-xs font-bold uppercase tracking-widest text-[#c05621] mb-6 flex items-center gap-2 flame-2">
                        <span className="h-px flex-1 bg-[#c05621]/30" /> Sandwiches <span className="h-px flex-1 bg-[#c05621]/30" />
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {menuData.sandwiches.map(item => (
                            <MenuCard key={item.name} item={item} catalogItem={findCatalogItem(item.name)} />
                        ))}
                    </div>
                </section>

                <section>
                    <h3 className="text-xs font-bold uppercase tracking-widest text-[#c05621] mb-6 flex items-center gap-2 flame-2">
                        <span className="h-px flex-1 bg-[#c05621]/30" /> Sides <span className="h-px flex-1 bg-[#c05621]/30" />
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {menuData.sides.map(item => (
                            <MenuCard key={item.name} item={item} catalogItem={findCatalogItem(item.name)} compact />
                        ))}
                    </div>
                </section>

                <section>
                    <h3 className="text-xs font-bold uppercase tracking-widest text-[#c05621] mb-6 flex items-center gap-2 flame-2">
                        <span className="h-px flex-1 bg-[#c05621]/30" /> Fresh Breads <span className="h-px flex-1 bg-[#c05621]/30" />
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {menuData.breads.map(item => (
                            <MenuCard key={item.name} item={item} catalogItem={findCatalogItem(item.name)} compact />
                        ))}
                    </div>
                </section>

                <section>
                    <h3 className="text-xs font-bold uppercase tracking-widest text-[#c05621] mb-6 flex items-center gap-2 flame-2">
                        <span className="h-px flex-1 bg-[#c05621]/30" /> Desserts <span className="h-px flex-1 bg-[#c05621]/30" />
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {menuData.desserts.map(item => (
                            <MenuCard key={item.name} item={item} catalogItem={findCatalogItem(item.name)} compact />
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Order;
