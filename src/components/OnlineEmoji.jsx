import React from "react";
import "./OnlineEmoji.css";


/**
 * Props:
 * - imageUrl (string) : optional URL to an online avatar/gif. If not provided, shows emojiFallback.
 * - emojiFallback (string) : default emoji to show (e.g. "🕺" or "🏆").
 * - size (number) : pixel size for avatar (default 96).
 * - isWinner (bool) : when true, plays dance animation.
 */
export default function OnlineEmoji({
  imageUrl,
  emojiFallback = "🕺",
  size = 96,
  isWinner = false,
}) {
  const style = { width: size, height: size, fontSize: Math.round(size * 0.6) };

  return (
    <div className={`online-emoji ${isWinner ? "dance" : ""}`} style={{ width: size }}>
      <div className="avatar-wrap" style={style}>
        {imageUrl ? (
          // img tag loads from an online URL (CORS requires the remote server to allow)
          <img className="avatar-img" src={imageUrl} alt="avatar" />
        ) : (
          <div className="emoji-fallback" aria-hidden>
            {emojiFallback}
          </div>
        )}
        <span className="status-badge" aria-hidden />
      </div>
    </div>
  );
}
