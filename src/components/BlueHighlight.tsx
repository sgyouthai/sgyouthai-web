export default function BlueHighlighter({
  width = 170,
  height = 1,
  color = "rgb(0, 85, 255)",
  opacity = 1,
  top = 0,
  className = "",
  style = {},
}) {
  return (
    <div
      aria-hidden="true"
      className={`flex-[0_0_auto] ${className}`}
      style={{
        position: "absolute",
        top,
        left: "50%",
        transform: "translateX(-50%)",
        width,
        height,
        zIndex: 1,
        background: `linear-gradient(90deg, rgba(0, 85, 255, 0) 0%, ${color} 50%, rgba(0, 85, 255, 0) 100%)`,
        opacity,
        ...style,
      }}
    />
  );
}
