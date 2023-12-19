import moment from "moment";

export function formatDuration(seconds: number) {
  const duration = moment.duration(seconds, "seconds");

  // If the duration is less than an hour, format as MM:SS
  if (duration.asHours() < 1) {
    return moment.utc(duration.asMilliseconds()).format("mm:ss");
  }

  // If the duration is an hour or more, format as HH:MM:SS
  return moment.utc(duration.asMilliseconds()).format("HH:mm:ss");
}