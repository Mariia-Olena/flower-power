export interface PlantInfo {
  name: string;
  video: string;
  plantCare: {
    light: {
      title: string;
      text: string;
    };
    watering: {
      title: string;
      text: string;
    };
    care: {
      title: string;
      text: string;
    };
  };
}