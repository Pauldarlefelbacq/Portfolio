import Icon from './assets/icon.svg';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';

const Lock = () => {
	const [isMobile, setIsMobile] = useState(false);
	const [sliderPosition, setSliderPosition] = useState(0);
	const [isDragging, setIsDragging] = useState(false);
	const sliderRef = useRef(null);
	const navigate = useNavigate();

	useEffect(() => {
		const checkMobile = () => {
			setIsMobile(window.innerWidth < 768);
		};
		checkMobile();
		window.addEventListener('resize', checkMobile);
		return () => window.removeEventListener('resize', checkMobile);
	}, []);

	const handleSliderStart = (e) => {
		setIsDragging(true);
	};

	const handleSliderMove = (e) => {
		if (!isDragging) return;
		
		const slider = sliderRef.current;
		if (!slider) return;

		const rect = slider.getBoundingClientRect();
		const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
		const position = clientX - rect.left;
		const maxPosition = rect.width - 60;

		if (position >= 0 && position <= maxPosition) {
			setSliderPosition(position);
		}

		if (position >= maxPosition * 0.9) {
			navigate('/destktop');
		}
	};

	const handleSliderEnd = () => {
		setIsDragging(false);
		setSliderPosition(0);
	};

	return (
		<main className='flex items-center justify-center min-h-screen bg-[url(./assets/bureau_BG.webp)] bg-cover px-4'>
			<div className='flex flex-col justify-center items-center w-full max-w-md'>
				<img className='mb-6 w-24 h-24 md:mb-10 md:w-32 md:h-32' src={Icon} alt="Icone marquée Paul.DF" />
				
				<div className='w-full space-y-3 md:space-y-4'>
					<h1 className='text-lg md:text-xl font-bold text-center p-3 md:p-4 bg-white/90 backdrop-blur rounded-xl shadow-lg'>
						Portfolio Paul Darle-Felbacq
					</h1>
					
					{!isMobile ? (
						<>
							<input 
								className='bg-white/90 backdrop-blur rounded-xl w-full p-3 md:p-4 text-lg md:text-xl shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400' 
								type="password" 
								placeholder="Mot de passe"
							/>
							<div className='flex w-full justify-center items-center gap-2 text-white text-base md:text-lg hover:font-bold transition-all pt-2'>
								<Link to='/destktop' className='hover:scale-105 transition-transform'>
									Se connecter
								</Link>
								<span>→</span>
							</div>
						</>
					) : (
						<div className='w-full'>
							<div 
								ref={sliderRef}
								className='relative bg-white/20 backdrop-blur rounded-full h-14 overflow-hidden cursor-pointer select-none'
								onMouseMove={handleSliderMove}
								onMouseUp={handleSliderEnd}
								onMouseLeave={handleSliderEnd}
								onTouchMove={handleSliderMove}
								onTouchEnd={handleSliderEnd}
							>
								<div 
									className='absolute inset-0 bg-gradient-to-r from-blue-400/50 to-transparent transition-all'
									style={{ width: `${(sliderPosition / (sliderRef.current?.offsetWidth - 60 || 1)) * 100}%` }}
								/>
								
								<div className='absolute inset-0 flex items-center justify-center pointer-events-none'>
									<span className='text-white font-medium text-sm'>
										{sliderPosition === 0 ? 'Glissez pour déverrouiller' : 'Continuez...'}
									</span>
								</div>
								
								<div
									className='absolute left-0 top-1/2 w-14 h-14 bg-white rounded-full shadow-lg flex items-center justify-center cursor-grab active:cursor-grabbing transition-transform'
									style={{ 
										transform: `translate(${sliderPosition}px, -50%)`,
										transition: isDragging ? 'none' : 'transform 0.3s ease-out'
									}}
									onMouseDown={handleSliderStart}
									onTouchStart={handleSliderStart}
								>
									<span className='text-2xl font-bold'>&gt;</span>
								</div>
							</div>
							
							<p className='text-center text-white/70 text-xs mt-2'>
								Ou tapez sur "Se connecter" ci-dessous
							</p>
							
							<div className='flex w-full justify-center items-center gap-2 text-white text-sm hover:font-bold transition-all pt-2'>
								<Link to='/destktop' className='hover:scale-105 transition-transform'>
									Se connecter
								</Link>
								<span>→</span>
							</div>
						</div>
					)}
				</div>
			</div>
		</main>
	);
};

export default Lock;