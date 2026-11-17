// Scarlett's 12-week plan (Planet Fitness). Edit this file to change the workouts.
// img: file in images/ (or null if no photo yet). main: true = uses the phase sets/reps.

const PHASES = [
  { id: "foundation", label: "Weeks 1–4", name: "Foundation", sets: 3, reps: "12–15", rest: "60 sec", effort: "3–4 reps left in the tank. Learn the form." },
  { id: "build",      label: "Weeks 5–8", name: "Build",      sets: 3, reps: "10–12", rest: "75 sec", effort: "Last 2 reps feel hard." },
  { id: "strength",   label: "Weeks 9–12", name: "Strength",  sets: 4, reps: "8–10",  rest: "90 sec", effort: "Last rep is a real fight, form clean." },
];

const WARMUP_RUN = "Run ends at the gym. Drink water, rest 5 min, then one light set of the first exercise.";
const WARMUP_LIFT = "5 min bike or incline walk, 10 bodyweight squats, 10 glute bridges, 8 walking lunges per leg, then one light set.";

const DAYS = [
  {
    id: "mon", short: "Mon", name: "Monday", title: "Lower body: squat & quads", run: "No run", warmup: WARMUP_LIFT,
    exercises: [
      { name: "Smith machine squat", main: true, img: "smith-squat.jpg",
        cues: ["Feet shoulder-width, bar across upper back", "Chest up, sit down and back for 3 seconds", "Thighs to parallel, drive through the heels"] },
      { name: "Leg press", main: true, img: "leg-press.jpg",
        cues: ["Feet shoulder-width in the middle of the plate", "Lower until knees are near 90 degrees", "Push through the whole foot, don't lock the knees"] },
      { name: "Dumbbell reverse lunge", sets: 3, reps: "10 per leg", img: "reverse-lunge.jpg",
        cues: ["Step back, tall chest", "Front knee at 90 degrees, back knee near the floor", "Push through the front heel to stand"] },
      { name: "Leg extension", sets: 3, reps: "12–15", img: "leg-extension.jpg",
        cues: ["Pad just above the ankles, back against the seat", "Extend until legs are straight, squeeze 1 second", "Lower slowly, no swinging"] },
      { name: "Hip abductor", sets: 3, reps: "15–20", img: "hip-abductor.jpg",
        cues: ["Sit tall, pads on the outside of the knees", "Push out as far as you can, squeeze the glutes", "Control the way back in"] },
      { name: "Standing calf raise", sets: 3, reps: "15", img: "calf-raise.jpg",
        cues: ["Balls of the feet on the edge, heels hanging", "Rise all the way up on the toes, pause", "Lower slowly until you feel a stretch"] },
    ],
  },
  {
    id: "tue", short: "Tue", name: "Tuesday", title: "Upper push + core", run: "3–6 mi, ends at the gym", warmup: WARMUP_RUN,
    exercises: [
      { name: "Dumbbell bench press", main: true, img: "bench-press.jpg",
        cues: ["Feet planted, shoulder blades pulled back", "Lower for 3 seconds to chest level", "Press up in a slight arc"] },
      { name: "Seated dumbbell shoulder press", main: true, img: "shoulder-press.jpg",
        cues: ["Back against the pad, dumbbells at ear height", "Press straight up to full lockout", "Lower under control"] },
      { name: "Incline dumbbell press", sets: 3, reps: "10–12", img: "incline-press.jpg",
        cues: ["Bench at 30–45 degrees", "Press over the upper chest", "Control the descent"] },
      { name: "Cable triceps pushdown", sets: 3, reps: "12–15", img: "triceps-pushdown.jpg",
        cues: ["Elbows tucked at your sides, don't let them flare", "Push down until arms are straight, squeeze", "Let the handle rise slowly"] },
      { name: "Dead bug", sets: 3, reps: "8 per side", img: "dead-bug.jpg",
        cues: ["On your back, arms up, knees over hips", "Lower opposite arm and leg, lower back stays flat", "Exhale as you extend"] },
      { name: "Side plank", sets: 2, reps: "20–30 sec per side", img: "side-plank.jpg",
        cues: ["Elbow under the shoulder", "Hips up, body in a straight line", "Breathe, don't let the hips sag"] },
    ],
  },
  {
    id: "wed", short: "Wed", name: "Wednesday", title: "Upper pull + core", run: "3–6 mi, ends at the gym", warmup: WARMUP_RUN,
    exercises: [
      { name: "Lat pulldown", main: true, img: "lat-pulldown.jpg",
        cues: ["Grip a bit wider than shoulders, chest up", "Pull the bar to the upper chest, elbows down", "Let it rise slowly, feel the stretch"] },
      { name: "Seated cable row", main: true, img: "cable-row.jpg",
        cues: ["Sit tall, slight knee bend", "Pull the handle to the belly button, squeeze the blades", "Return slowly, don't round the back"] },
      { name: "One-arm dumbbell row", sets: 3, reps: "10–12 per arm", img: "one-arm-row.jpg",
        cues: ["Knee and hand on the bench, flat back", "Pull the elbow to the hip, squeeze the blade", "No torso rotation"] },
      { name: "Cable face pull", sets: 3, reps: "15", img: "face-pull.jpg",
        cues: ["Rope at face height, arms straight to start", "Pull toward the face, elbows high and wide", "Squeeze the shoulder blades together"] },
      { name: "Dumbbell hammer curl", sets: 3, reps: "12", img: "hammer-curl.jpg",
        cues: ["Palms facing each other", "Curl up without swinging the elbows", "Lower slowly"] },
      { name: "Ab crunch machine or cable crunch", sets: 3, reps: "12–15", img: "ab-crunch.jpg",
        cues: ["Curl the ribs toward the hips", "Exhale at the bottom, squeeze", "Come back up slowly"] },
    ],
  },
  {
    id: "thu", short: "Thu", name: "Thursday", title: "Lower body: glutes & hamstrings", run: "No run", warmup: WARMUP_LIFT,
    note: "Keep RDLs and step-ups 2 reps short of failure. Friday run is next.",
    exercises: [
      { name: "Hip thrust (Smith machine or dumbbell)", main: true, img: "hip-thrust.jpg",
        cues: ["Upper back on the bench, feet flat", "Drive through the heels to full hip extension", "Squeeze the glutes 1 second at the top"] },
      { name: "Dumbbell Romanian deadlift", main: true, img: "rdl.jpg",
        cues: ["Soft knees, flat back", "Hinge at the hips, dumbbells slide down the legs", "Stop when you feel the hamstrings stretch, then stand"] },
      { name: "Dumbbell step-up", sets: 3, reps: "8 per leg", img: "step-up.jpg",
        cues: ["Full foot on the bench", "Drive through the heel to stand", "Slow step down"] },
      { name: "Seated leg curl", sets: 3, reps: "12–15", img: "leg-curl.jpg",
        cues: ["Pad just above the heels, thigh pad locked", "Curl all the way down, squeeze the hamstrings", "Return slowly for 3 seconds"] },
      { name: "Cable kickback", sets: 3, reps: "12–15 per leg", img: "cable-kickback.jpg",
        cues: ["Ankle strap on, hold the machine, slight lean forward", "Kick the leg straight back, squeeze the glute", "Don't arch the lower back"] },
      { name: "Plank", sets: 3, reps: "30–60 sec", img: "plank.jpg",
        cues: ["Elbows under the shoulders", "Straight line from head to heels", "Squeeze glutes and abs, breathe"] },
    ],
  },
  {
    id: "fri", short: "Fri", name: "Friday", title: "Shoulders, arms & core (light)", run: "3–6 mi, ends at the gym", warmup: WARMUP_RUN,
    exercises: [
      { name: "Dumbbell lateral raise", sets: 3, reps: "12–15", img: "lateral-raise.jpg",
        cues: ["Lead with the elbows", "Raise to shoulder height only", "Slow 3-second lower"] },
      { name: "Dumbbell reverse fly", sets: 3, reps: "12–15", img: "reverse-fly.jpg",
        cues: ["Hinge forward, flat back", "Open the arms like wings", "Squeeze the rear delts"] },
      { name: "Dumbbell curl", sets: 3, reps: "12", superset: "Superset with cable pushdown", img: "dumbbell-curl.jpg",
        cues: ["Elbows pinned to the sides", "Curl up, squeeze at the top", "Lower slowly, no swinging"] },
      { name: "Cable triceps pushdown", sets: 3, reps: "12", superset: "Superset with dumbbell curl", img: "triceps-pushdown.jpg",
        cues: ["Elbows tucked at your sides", "Push down until arms are straight", "Let the handle rise slowly"] },
      { name: "Cable woodchop", sets: 2, reps: "10 per side", img: "woodchop.jpg",
        cues: ["Cable set high, feet wide", "Pull across the body to the opposite hip", "Rotate from the hips and core, arms stay long"] },
      { name: "Plank", sets: 2, reps: "30–60 sec", img: "plank.jpg",
        cues: ["Elbows under the shoulders", "Straight line from head to heels", "Squeeze glutes and abs, breathe"] },
    ],
  },
  { id: "sat", short: "Sat", name: "Saturday", title: "Rest day", run: "No run", rest: true, exercises: [] },
  { id: "sun", short: "Sun", name: "Sunday", title: "Long run", run: "3–6 mi, your longest run of the week", rest: true, exercises: [] },
];
