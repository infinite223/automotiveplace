export function scrollContainerToTop(id: string = "content-container") {
  const container = document.getElementById(id);
  if (container) {
    container.scrollTo({ top: 0, behavior: "smooth" });
  }
}
