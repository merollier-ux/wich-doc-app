import { useState } from 'react';
import { ArrowRight, X, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import SmartImage from '../components/SmartImage';
import { initialBlogPosts } from '../data';
import { useAuth } from '../context/Authcontext';

const BlogModal = ({ post, onClose }) => {
    if (!post) return null;
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300 text-left">
            <div className="bg-[#f4ebd0] rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl relative flex flex-col border-4 border-[#1a110d] lantern-container">
                <button onClick={onClose} className="absolute top-4 right-4 z-10 p-2 bg-[#1a110d] hover:bg-[#c05621] rounded-full text-white transition-colors cursor-pointer">
                    <X size={24} />
                </button>
                <div className="h-64 w-full bg-[#1a110d]">
                    <SmartImage src={`/${post.image}`} alt={post.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-8 overflow-y-auto texture-burlap">
                    <div className="flex justify-between items-center mb-4 border-b border-[#1a110d]/20 pb-2">
                        <span className="text-xs font-bold text-[#c05621] uppercase tracking-widest">{post.category}</span>
                        <span className="text-xs text-[#1a110d]/60 font-mono">{post.date}</span>
                    </div>
                    <h2 className="text-3xl font-bold text-[#1a110d] mb-6 font-serif">{post.title}</h2>
                    <p className="text-[#1a110d] leading-relaxed text-lg font-serif">{post.content}</p>
                </div>
            </div>
        </div>
    );
};

const Blog = () => {
    const [selectedPost, setSelectedPost] = useState(null);
    const { userProfile } = useAuth();
    const isMember = userProfile?.isMember;

    const handlePostClick = (post) => {
        if (post.memberOnly && !isMember) return;
        setSelectedPost(post);
    };

    return (
        <div className="max-w-4xl mx-auto p-12 text-center space-y-12 animate-in texture-burlap min-h-screen">
            <BlogModal post={selectedPost} onClose={() => setSelectedPost(null)} />
            <div>
                <h2 className="text-4xl font-bold text-[#1a110d] mb-2">Lab Journal</h2>
                <p className="text-[#c05621] font-mono text-xs uppercase tracking-widest flame-1">Field Notes from the Alchemist</p>
            </div>
            <div className="grid gap-12">
                {initialBlogPosts.map(post => {
                    const locked = post.memberOnly && !isMember;
                    return (
                        <div
                            key={post.id}
                            onClick={() => handlePostClick(post)}
                            className={`bg-white border-2 border-[#1a110d] p-2 transition-all text-left transform ${locked ? 'cursor-default opacity-80' : 'hover:shadow-xl cursor-pointer group hover:-rotate-1'}`}
                        >
                            <div className="border border-dashed border-[#1a110d]/30 p-6 flex flex-col md:flex-row gap-6 relative">
                                <div className="md:w-1/3 h-48 md:h-auto bg-stone-200 relative">
                                    <div className="absolute top-0 left-0 bg-[#c05621] text-white text-[10px] font-bold px-2 py-1 z-10 flame-2">{post.category}</div>
                                    <SmartImage src={`/${post.image}`} alt={post.title} className={`w-full h-full object-cover ${locked ? 'blur-sm' : ''}`} />
                                </div>
                                <div className="md:w-2/3 flex flex-col justify-center">
                                    <span className="text-[10px] font-bold text-[#1a110d]/50 uppercase tracking-widest mb-2">{post.date}</span>
                                    <h3 className="text-2xl font-serif font-bold text-[#1a110d] mb-3 group-hover:text-[#c05621] transition-colors">{post.title}</h3>
                                    {locked ? (
                                        <div className="space-y-3">
                                            <p className="text-stone-400 text-sm leading-relaxed italic">"{post.excerpt}"</p>
                                            <div className="flex items-center gap-2 bg-[#1a110d] text-[#f4ebd0] px-4 py-3 rounded inline-flex w-fit">
                                                <Lock size={12} />
                                                <span className="text-[10px] font-bold uppercase tracking-widest">Member Exclusive —</span>
                                                <Link to="/portal" onClick={e => e.stopPropagation()} className="text-[10px] font-bold uppercase tracking-widest text-[#c05621] hover:underline flame-1">Join to read</Link>
                                            </div>
                                        </div>
                                    ) : (
                                        <>
                                            <p className="text-stone-600 text-sm leading-relaxed mb-4">"{post.excerpt}"</p>
                                            <span className="text-[#c05621] font-bold text-xs uppercase tracking-wide flex items-center gap-2 flame-3">Read Entry <ArrowRight size={14}/></span>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Blog;
