"use client";

import { useEffect, useRef } from "react";
import type { VideoItem } from "@/types/media";

interface VideoCardProps {
	video: VideoItem;
	className?: string;
	autoSound?: boolean;
}

export function VideoCard({ video, className = "", autoSound = false }: VideoCardProps) {
	const videoRef = useRef<HTMLVideoElement | null>(null);

	const playVideo = () => {
		const element = videoRef.current;
		if (!element) return;
		element.muted = !autoSound;
		element.play().catch(() => {
			element.muted = true;
		element.play().catch(() => undefined);
		});
	};

	useEffect(() => {
		const element = videoRef.current;
		if (!element) return;

		const observer = new IntersectionObserver(([entry]) => {
			if (entry.isIntersecting) {
				playVideo();
			} else {
				element.pause();
				element.muted = true;
			}
		}, { threshold: 0.2 });

		observer.observe(element);
		return () => observer.disconnect();
	}, []);

	return (
		<div className={`relative overflow-hidden bg-black ${className}`}>
			<video
				ref={videoRef}
				title={video.title}
				autoPlay
				muted
				loop
				playsInline
				preload="auto"
				onLoadedData={playVideo}
				className="h-full w-full object-cover"
			>
				<source src={video.src} />
				Tu navegador no puede reproducir este video.
			</video>
		</div>
	);
}
