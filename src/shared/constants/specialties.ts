export const VET_SPECIALTIES = [
  { value: "dogs", label: "Dogs" },
  { value: "cats", label: "Cats" },
  { value: "birds", label: "Birds" },
  { value: "rabbits", label: "Rabbits" },
  { value: "reptiles", label: "Reptiles" },
  { value: "fish", label: "Fish" },
  { value: "horses", label: "Horses" },
  { value: "livestock", label: "Livestock" },
  { value: "exotic", label: "Exotic Animals" },
  { value: "surgery", label: "Surgery" },
  { value: "dentistry", label: "Dentistry" },
  { value: "dermatology", label: "Dermatology" },
  { value: "oncology", label: "Oncology" },
  { value: "cardiology", label: "Cardiology" },
  { value: "neurology", label: "Neurology" },
  { value: "emergency", label: "Emergency & Critical Care" },
  { value: "nutrition", label: "Nutrition" },
  { value: "behavior", label: "Behavior" },
] as const;

export type VetSpecialty = (typeof VET_SPECIALTIES)[number]["value"];
