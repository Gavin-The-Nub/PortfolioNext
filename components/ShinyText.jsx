const ShinyText = ({ text, disabled = false, speed = 5, className = "" }) => {
  const animationDuration = `${speed}s`;

  return (
    <div
      className={`bg-clip-text inline-block ${disabled ? "" : "animate-shine"} ${className}`}
      style={{
        backgroundImage:
          "linear-gradient(120deg, #e4e4e4 35%, #ffffff 45%, #ffffff 55%, #e4e4e4 65%)",
        backgroundSize: "200% 100%",
        WebkitBackgroundClip: "text",
        color: "transparent",
        animationDuration: animationDuration,
      }}
    >
      {text}
    </div>
  );
};

export default ShinyText;
