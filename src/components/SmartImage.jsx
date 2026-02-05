import { useState, useEffect } from 'react';
import { Image } from 'lucide-react';

const SmartImage = ({ src, alt, className, lazy = true }) => {
    const [imgSrc, setImgSrc] = useState(src);
    const [hasRetried, setHasTried] = useState(false);
    const [error, setError] = useState(false);
    
    useEffect(() => {
        setImgSrc(src);
        setHasTried(false);
        setError(false);
    }, [src]);

    const handleError = () => {
        if (!hasRetried) {
            setHasTried(true);
            // Simple swap logic: if png, try jpg. If jpg, try png.
            if (imgSrc && imgSrc.toLowerCase().endsWith('.png')) {
                setImgSrc(imgSrc.replace(/\.png$/i, '.jpg'));
            } else if (imgSrc && imgSrc.toLowerCase().endsWith('.jpg')) {
                setImgSrc(imgSrc.replace(/\.jpg$/i, '.png'));
            } else {
                setError(true);
            }
        } else {
            setError(true);
        }
    };
    
    if (error) {
        return (
            <div className={`flex flex-col items-center justify-center bg-[#f4ebd0] text-[#1a110d] p-4 text-center border-2 border-dashed border-[#1a110d]/20 ${className}`}>
                <Image className="opacity-50 mb-2" size={24} />
                <p className="font-bold text-[10px] uppercase tracking-widest">Image Missing</p>
                <p className="font-mono text-[8px] mt-1 opacity-70">{src}</p>
            </div>
        );
    }
    
    return <img src={imgSrc} alt={alt} className={className} loading={lazy ? "lazy" : "eager"} onError={handleError} />;
};

export default SmartImage;