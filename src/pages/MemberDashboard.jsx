import { useNavigate } from 'react-router-dom';
import { UserCircle, ShieldCheck, LogOut, Lock, Star } from 'lucide-react';
import { useAuth } from '../context/Authcontext';
import { SOCIALS } from '../data';

const MemberDashboard = () => {
    const { user, userProfile, logOut } = useAuth();
    const navigate = useNavigate();

    const handleLogOut = async () => {
        await logOut();
        navigate('/portal');
    };

    const isMember = userProfile?.isMember;

    return (
        <div className="min-h-screen texture-burlap py-20 px-4 animate-in">
            <div className="max-w-xl mx-auto space-y-6">

                {/* Patient file card */}
                <div className="bg-white border-4 border-[#1a110d] rounded-3xl overflow-hidden shadow-xl lantern-container">
                    <div className="bg-[#152238] bg-denim-patch px-8 py-5 border-b-4 border-[#c05621] flex items-center justify-between">
                        <h1 className="text-[#f4ebd0] font-bold uppercase tracking-widest text-sm">Patient File</h1>
                        {isMember && (
                            <div className="flex items-center gap-1 bg-[#c05621] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest flame-1">
                                <Star size={10} /> Member
                            </div>
                        )}
                    </div>
                    <div className="p-8 flex items-start gap-6">
                        <div className="bg-[#f4ebd0] p-4 rounded-full border-2 border-dashed border-[#1a110d]/30 shrink-0">
                            <UserCircle size={40} className="text-[#1a110d]/60" />
                        </div>
                        <div className="space-y-1">
                            <h2 className="text-xl font-bold text-[#1a110d] font-serif">{userProfile?.displayName || 'Patient'}</h2>
                            <p className="text-sm text-[#1a110d]/60">{user?.email}</p>
                            {isMember && (
                                <p className="text-xs text-[#c05621] font-bold uppercase tracking-widest flame-2">Active Member</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Member perks or upgrade prompt */}
                {isMember ? (
                    <div className="bg-[#f4ebd0] border-4 border-[#1a110d] rounded-3xl overflow-hidden shadow-xl">
                        <div className="px-8 py-5 border-b-2 border-[#1a110d]/20">
                            <h3 className="font-bold text-[#1a110d] uppercase tracking-widest text-sm flex items-center gap-2">
                                <ShieldCheck size={14} className="text-[#c05621] flame-2" /> Member Privileges
                            </h3>
                        </div>
                        <ul className="p-8 space-y-3">
                            {[
                                'Exclusive recipes & behind-the-scenes lab posts',
                                'Early access to new menu items',
                                'Member-only Lab Journal entries',
                                'Priority order status updates',
                            ].map(perk => (
                                <li key={perk} className="flex items-start gap-3 text-sm text-[#1a110d]">
                                    <span className="text-[#c05621] flame-1 mt-0.5">✦</span>
                                    <span>{perk}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <div className="bg-[#f4ebd0] border-4 border-[#1a110d] rounded-3xl overflow-hidden shadow-xl">
                        <div className="px-8 py-5 border-b-2 border-[#1a110d]/20">
                            <h3 className="font-bold text-[#1a110d] uppercase tracking-widest text-sm flex items-center gap-2">
                                <Lock size={14} className="text-[#1a110d]/50" /> Upgrade to Member
                            </h3>
                        </div>
                        <div className="p-8 space-y-4">
                            <p className="text-sm text-[#1a110d]/70 leading-relaxed">Your account is active. Become a member to unlock exclusive recipes, early menu access, and member-only Lab Journal entries.</p>
                            <a
                                href={SOCIALS.membership}
                                target="_blank"
                                rel="noreferrer"
                                className="block w-full py-4 bg-[#c05621] text-white rounded font-bold text-sm uppercase tracking-widest text-center hover:bg-[#a84615] transition-colors flame-2"
                            >
                                Purchase Membership
                            </a>
                        </div>
                    </div>
                )}

                {/* Sign out */}
                <button
                    onClick={handleLogOut}
                    className="w-full py-3 flex items-center justify-center gap-2 text-[#1a110d]/40 hover:text-[#1a110d] text-xs font-bold uppercase tracking-widest transition-colors cursor-pointer"
                >
                    <LogOut size={14} /> Sign Out
                </button>
            </div>
        </div>
    );
};

export default MemberDashboard;
