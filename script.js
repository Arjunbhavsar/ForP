document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".memory-card, .timeline-item");

  cards.forEach((card, index) => {
    card.animate(
      [
        { opacity: 0, transform: "translateY(14px)" },
        { opacity: 1, transform: "translateY(0)" },
      ],
      {
        duration: 500,
        delay: index * 90,
        fill: "forwards",
      }
    );
  });
});
