"use client";

import { VideoCard } from "@/components/ui/VideoCard";
import type { VideoGroup } from "@/types/media";

interface VideoTripticoProps {
  group: VideoGroup;
}

export function VideoTriptico({ group }: VideoTripticoProps) {
  return (
    <section className="relative py-8 sm:py-10">
      {/* Client name header */}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5 sm:px-6">
        <div className="flex items-center gap-3">
          <span
            className="text-brand-orange text-lg leading-none select-none"
            aria-hidden
          >
            ❯❯
          </span>
          <h3 className="font-bebas text-3xl sm:text-4xl text-white tracking-wide">
            {group.cliente}
          </h3>
        </div>
        <span
          className="text-brand-orange text-lg leading-none select-none"
          aria-hidden
        >
          ❮❮
        </span>
      </div>

      {/* Three portrait videos per client */}
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 px-4 sm:grid-cols-3 sm:gap-5 sm:px-6">
        {group.videos.slice(0, 3).map((video, index) => (
          <div
            key={`${group.cliente}-${index}`}
            className="relative aspect-[11/16] min-h-[28rem] overflow-hidden rounded-2xl border border-white/10 bg-black shadow-[0_20px_40px_rgba(0,0,0,0.35)]"
          >
            <VideoCard
              video={video}
              className="absolute inset-0 h-full w-full"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
