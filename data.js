// Scarlett's 12-week plan (Planet Fitness). Edit this file to change the workouts.
// img: file in images/ (a missing file shows the "No photo yet" box). main: true = uses the phase sets/reps.
// levels: a skill exercise (pull-up / handstand) with 3 versions, one per phase: Foundation, Build, Strength.
// assist: true = the weight box tracks machine help (less help = stronger). bw: true = no weight box.

const PHASES = [
  { id: "foundation", label: "Weeks 1–4", name: "Foundation", sets: 3, reps: "12–15", rest: "60 sec", effort: "3–4 reps left in the tank. Learn the form." },
  { id: "build",      label: "Weeks 5–8", name: "Build",      sets: 3, reps: "10–12", rest: "75 sec", effort: "Last 2 reps feel hard." },
  { id: "strength",   label: "Weeks 9–12", name: "Strength",  sets: 4, reps: "8–10",  rest: "90 sec", effort: "Last rep is a real fight, form clean." },
];

const WARMUP_RUN = "Run ends at the gym. Drink water, rest 5 min, then one light set of the first exercise.";
const WARMUP_LIFT = "5 min bike or incline walk, 10 bodyweight squats, 10 glute bridges, 8 walking lunges per leg, then one light set.";
const WRIST_PREP = "Wrist warm-up before handstand work: on hands and knees, rock forward and back 10 times, then 10 times with fingers pointing back toward the knees.";

const PIKE_PUSH = {
  name: "Pike push-up", bw: true,
  levels: [
    { name: "Pike push-up", sets: 3, reps: "6–8", img: "pike-push-up.jpg",
      cues: ["Hips high in an upside-down V, hands shoulder-width", "Bend the elbows and lower the top of your head toward the floor just in front of the hands", "Press back up. Elbows point back, not out to the sides"] },
    { name: "Elevated pike push-up", sets: 3, reps: "6–8", img: "elevated-pike-push-up.jpg",
      cues: ["Feet on a bench, walk the hands in until hips are over the shoulders", "Lower the top of your head toward the floor in front of the hands", "Press up until the arms are straight and the shoulders push tall"] },
    { name: "Wall walk", sets: 3, reps: "3", img: "wall-walk.jpg",
      cues: ["Start in a push-up with the feet against the wall", "Walk the feet up the wall and the hands in until the chest is close to the wall", "Pause 2 seconds, then walk back down slowly"] },
  ],
};

const HANDSTAND_PRACTICE = {
  name: "Handstand practice", bw: true, rest: "60–90 sec",
  levels: [
    { name: "Pike hold on a bench", sets: 3, reps: "20–30 sec", img: "pike-hold.jpg",
      cues: ["Feet on a bench, hands on the floor shoulder-width", "Walk the hands in until the hips are over the shoulders", "Push the floor away, arms straight, ears between the arms", "Hold and breathe, then walk out"] },
    { name: "Chest-to-wall handstand", sets: 3, reps: "15–30 sec", img: "wall-handstand.jpg", imgNote: "The photo shows her back to the wall. Face the wall instead: it keeps your body straighter.",
      cues: ["Practice coming down first: walk the hands out, or turn to one side and step down", "From a push-up with feet on the wall, walk the feet up and hands in until the chest is near the wall", "Push tall through the shoulders, ribs in, glutes and legs squeezed", "Look at the floor between the hands"] },
    { name: "Toe pulls & kick-ups", sets: 5, reps: "5–10 sec off the wall", img: "handstand-kickup.jpg",
      cues: ["Walk up to a chest-to-wall handstand", "Press into the fingers and peel the toes off the wall, balance as long as you can", "Then 3–5 kick-ups in open space. Cartwheel out to come down", "Goal: 5 seconds freestanding"] },
  ],
};

const DAYS = [
  {
    id: "mon", short: "Mon", name: "Monday", title: "Lower body: squat & quads + handstand", run: "No run", warmup: WARMUP_LIFT + " " + WRIST_PREP,
    note: "Handstand first while you're fresh. You need a clear wall (the stretch area usually works).",
    exercises: [
      HANDSTAND_PRACTICE,
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
    id: "tue", short: "Tue", name: "Tuesday", title: "Upper push + core", run: "3–6 mi, ends at the gym", warmup: WARMUP_RUN + " " + WRIST_PREP,
    exercises: [
      { name: "Dumbbell bench press", main: true, img: "bench-press.jpg",
        cues: ["Feet planted, shoulder blades pulled back", "Lower for 3 seconds to chest level", "Press up in a slight arc"] },
      { name: "Seated dumbbell shoulder press", main: true, img: "shoulder-press.jpg",
        cues: ["Back against the pad, dumbbells at ear height", "Press straight up to full lockout", "Lower under control"] },
      PIKE_PUSH,
      { name: "Cable triceps pushdown", sets: 3, reps: "12–15", img: "triceps-pushdown.jpg",
        cues: ["Elbows tucked at your sides, don't let them flare", "Push down until arms are straight, squeeze", "Let the handle rise slowly"] },
      { name: "Dead bug", bw: true, sets: 3, reps: "8 per side", img: "dead-bug.jpg",
        cues: ["On your back, arms up, knees over hips", "Lower opposite arm and leg, lower back stays flat", "Exhale as you extend"] },
      { name: "Hollow body hold", bw: true, sets: 3, reps: "20–30 sec", img: "hollow-hold.jpg",
        cues: ["On your back, press the lower back into the floor", "Lift the arms overhead and the legs a few inches off the floor, like a shallow banana", "Too hard? Bend the knees. This is the body line for a handstand"] },
    ],
  },
  {
    id: "wed", short: "Wed", name: "Wednesday", title: "Upper pull + pull-up", run: "3–6 mi, ends at the gym", warmup: WARMUP_RUN,
    note: "Pull-up work first while your arms are fresh. Use the assisted pull-up machine's top handles as the bar.",
    exercises: [
      { name: "Pull-up practice", bw: true, rest: "60–90 sec",
        levels: [
          { name: "Scapular pull-up", sets: 3, reps: "8–10", img: "scapular-pull-up.jpg",
            cues: ["Hang from the bar, hands just wider than shoulders, arms straight", "Pull the shoulder blades down and back so your body rises 2–3 inches. Elbows stay straight", "Hold 2 seconds, then lower slowly to a full hang"] },
          { name: "Pull-up negative", sets: 3, reps: "3 (5-sec lower)", img: "pull-up-negative.jpg",
            cues: ["Step up on a bench or the machine platform so your chin is over the bar", "Lift the feet and lower yourself for a slow 5-count to straight arms", "Step back up to start the next rep. Don't jump or drop"] },
          { name: "Slow pull-up negative", sets: 4, reps: "3 (8–10 sec)", img: "pull-up-negative.jpg",
            cues: ["Every 2 weeks: try one real pull-up first, while fresh", "Step up, chin over the bar, lift the feet", "Lower for 8–10 seconds, fighting the whole way down"] },
        ] },
      { name: "Assisted pull-up", assist: true, sets: 4, reps: "6–8", rest: "90 sec", img: "assisted-pull-up.jpg",
        cues: ["Knees on the pad, hands just wider than shoulders, palms facing away", "Pull the chest toward the bar, elbows down to the ribs", "Lower for 3 seconds to straight arms", "The weight is help. When every set hits 8, take one plate off"] },
      { name: "Lat pulldown", main: true, img: "lat-pulldown.jpg",
        cues: ["Grip a bit wider than shoulders, chest up", "Pull the bar to the upper chest, elbows down", "Let it rise slowly, feel the stretch"] },
      { name: "Seated cable row", main: true, img: "cable-row.jpg",
        cues: ["Sit tall, slight knee bend", "Pull the handle to the belly button, squeeze the blades", "Return slowly, don't round the back"] },
      { name: "Cable face pull", sets: 3, reps: "15", img: "face-pull.jpg",
        cues: ["Rope at face height, arms straight to start", "Pull toward the face, elbows high and wide", "Squeeze the shoulder blades together"] },
      { name: "Hanging knee raise", bw: true, sets: 3, reps: "8–12", img: "hanging-knee-raise.jpg",
        cues: ["Captain's chair: back on the pad, forearms on the rests (or hang from the bar for extra grip work)", "Curl the knees up toward the chest and tilt the hips up", "Lower slowly, no swinging"] },
    ],
  },
  {
    id: "thu", short: "Thu", name: "Thursday", title: "Lower body: glutes & hamstrings + handstand", run: "No run", warmup: WARMUP_LIFT + " " + WRIST_PREP,
    note: "Handstand first. Keep RDLs and step-ups 2 reps short of failure. Friday run is next.",
    exercises: [
      HANDSTAND_PRACTICE,
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
      { name: "Plank", bw: true, sets: 3, reps: "30–60 sec", img: "plank.jpg",
        cues: ["Elbows under the shoulders", "Straight line from head to heels", "Squeeze glutes and abs, breathe"] },
    ],
  },
  {
    id: "fri", short: "Fri", name: "Friday", title: "Shoulders, arms & hang (light)", run: "3–6 mi, ends at the gym", warmup: WARMUP_RUN,
    exercises: [
      { name: "Hang practice", bw: true, rest: "60–90 sec",
        levels: [
          { name: "Dead hang", sets: 3, reps: "20–30 sec", img: "dead-hang.jpg",
            cues: ["Full grip on the bar, thumbs wrapped around, hands just wider than shoulders", "Arms straight, shoulders gently pulled down away from the ears", "Breathe and hold. Step down before the grip gives out"] },
          { name: "Chin-over-bar hold", sets: 3, reps: "10–15 sec", img: "flexed-arm-hang.jpg",
            cues: ["Step up so your chin is over the bar, palms facing away", "Lift the feet, elbows tight to the sides, squeeze the back", "When you can't hold it, lower slowly instead of dropping"] },
          { name: "Chin-over-bar hold", sets: 3, reps: "20–30 sec", img: "flexed-arm-hang.jpg",
            cues: ["Step up so your chin is over the bar, palms facing away", "Lift the feet, elbows tight to the sides, squeeze the back", "Finish each hold with a slow lower to straight arms"] },
        ] },
      { name: "Dumbbell lateral raise", sets: 3, reps: "12–15", img: "lateral-raise.jpg",
        cues: ["Lead with the elbows", "Raise to shoulder height only", "Slow 3-second lower"] },
      { name: "Dumbbell reverse fly", sets: 3, reps: "12–15", img: "reverse-fly.jpg",
        cues: ["Hinge forward, flat back", "Open the arms like wings", "Squeeze the rear delts"] },
      { name: "Dumbbell curl", sets: 3, reps: "12", superset: "Superset with cable pushdown", img: "dumbbell-curl.jpg",
        cues: ["Elbows pinned to the sides", "Curl up, squeeze at the top", "Lower slowly, no swinging"] },
      { name: "Cable triceps pushdown", sets: 3, reps: "12", superset: "Superset with dumbbell curl", img: "triceps-pushdown.jpg",
        cues: ["Elbows tucked at your sides", "Push down until arms are straight", "Let the handle rise slowly"] },
      { name: "Side plank", bw: true, sets: 2, reps: "20–30 sec per side", img: "side-plank.jpg",
        cues: ["Elbow under the shoulder", "Hips up, body in a straight line", "Breathe, don't let the hips sag"] },
    ],
  },
  { id: "sat", short: "Sat", name: "Saturday", title: "Rest day", run: "No run", rest: true, exercises: [] },
  { id: "sun", short: "Sun", name: "Sunday", title: "Long run", run: "3–6 mi, your longest run of the week", rest: true, exercises: [] },
];
