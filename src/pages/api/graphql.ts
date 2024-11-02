import { getUserEvents } from "@/server/model/events";

// Example usage
export default getUserEvents(1).then(events => console.log(events));