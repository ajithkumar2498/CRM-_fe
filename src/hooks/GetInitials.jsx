export function getInitials(fullName) {
    if (!fullName || typeof fullName !== "string") return "?"; // Handle undefined, null, or non-string values
  
    const names = fullName.trim().split(" "); // Ensure there's no extra whitespace
  
    const initials = names
      .slice(0, 2) // Take first two words
      .map((name) => (name ? name[0].toUpperCase() : "")); // Ensure name exists before accessing index 0
  
    return initials.join("") || "?"; // If nothing is found, return "?"
  }