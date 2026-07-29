// Small header animation for "The Lost Accumulator".
// A handful of dots hop along a track. Blue ones jump ahead, orange ones jump
// back. When a dot reaches either end of the track it changes color and starts
// jumping the other way (much like the residual stream accumulating on the way
// in and the deltas being subtracted back out on the way home).

const BLUE   = [ 31, 119, 180];   // jumps ahead
const ORANGE = [255, 127,  14];   // jumps back

const FORWARD_HEIGHT  = 38;       // a big leap ahead
const BACKWARD_HEIGHT = 16;       // a small hop back
const TRAIL_LENGTH    = 55;       // frames of fading path kept behind each dot

const SPEED = 0.02;               // shared by every dot, see below
const SPOTS = 17;                 // landing spots on the track, indexed 0..SPOTS

// Each dot gets its own starting spot, direction, gait (arc height) and phase
// (how far into its first hop it starts). Every dot moves at the same speed on
// purpose: dots going the same way then keep their spacing forever instead of
// slowly drifting into each other. The staggered phases keep dots going
// opposite ways from landing on the same spot at the same moment.
const DOTS = [
    { spot:  0, dir:  1, gait: 1.00, phase: 0.00 },
    { spot:  4, dir: -1, gait: 0.85, phase: 0.50 },
    { spot:  8, dir:  1, gait: 1.10, phase: 0.25 },
    { spot: 13, dir: -1, gait: 0.92, phase: 0.75 },
    { spot: 17, dir: -1, gait: 1.02, phase: 0.15 },
];

// Neutral color for the ground line, adapting to the current theme.
function neutralColor() {
    return document.body.classList.contains('dark-mode') ? [200, 200, 200] : [70, 70, 70];
}

// A dot hops between discrete landing spots on the track. Spots are tracked by
// integer index (not by float x) so landing exactly on either end is exact.
class Hopper {
    constructor({ spot, dir, gait, phase }, lastSpot) {
        this.spot     = spot;      // index of the spot we are hopping from
        this.next     = spot;      // index of the spot we are hopping to
        this.dir      = dir;       // +1 = ahead, -1 = back
        this.gait     = gait;      // per-dot arc height multiplier
        this.lastSpot = lastSpot;
        this.t        = phase;     // progress within the hop, in [0, 1)
        this.trail    = [];        // recent positions, oldest first
    }

    color() {
        return this.dir > 0 ? BLUE : ORANGE;
    }

    height() {
        return (this.dir > 0 ? FORWARD_HEIGHT : BACKWARD_HEIGHT) * this.gait;
    }

    // Aim at the next spot, turning around first if we are at either end.
    aim() {
        if (this.spot + this.dir > this.lastSpot || this.spot + this.dir < 0) {
            this.dir = -this.dir;
        }
        this.next = this.spot + this.dir;
    }

    step() {
        this.t += SPEED;
        if (this.t >= 1) {
            this.t -= 1;           // carry the remainder so the stagger survives
            this.spot = this.next;
            this.aim();
        }
    }

    // Current position, interpolating along the current hop.
    position(p, left, spacing, ground) {
        const from = left + this.spot * spacing;
        const to   = left + this.next * spacing;
        return {
            x: from + (to - from) * this.t,
            y: ground - this.height() * p.sin(p.PI * this.t)
        };
    }

    // Remember where we have been. The color is stored per point, so the trail
    // keeps the color the dot had at the time it passed through.
    record(pos) {
        this.trail.push({ x: pos.x, y: pos.y, c: this.color() });
        if (this.trail.length > TRAIL_LENGTH) this.trail.shift();
    }
}

const dotsAnimation = (p) => {
    const container = document.getElementById("canvas-container-dots");
    const width  = parseFloat(container.getAttribute("width"));
    const height = parseFloat(container.getAttribute("height"));

    const margin = 24;
    const left   = margin;
    const right  = width - margin;
    const ground = height - 32;
    const radius = 6;

    const spacing = (right - left) / SPOTS;

    const dots = DOTS.map(cfg => new Hopper(cfg, SPOTS));
    dots.forEach(dot => dot.aim());

    p.setup = () => {
        const canvas = p.createCanvas(width, height);
        canvas.parent('canvas-container-dots');
    };

    p.draw = () => {
        p.clear();
        const col = neutralColor();

        // ground line
        p.stroke(col[0], col[1], col[2], 70);
        p.strokeWeight(1);
        p.line(left, ground + radius + 2, right, ground + radius + 2);

        p.noStroke();
        for (const dot of dots) {
            dot.step();
            const pos = dot.position(p, left, spacing, ground);
            dot.record(pos);

            // fading path: older points are fainter and smaller
            dot.trail.forEach((point, i) => {
                const age = (i + 1) / dot.trail.length;   // 1 = most recent
                p.fill(point.c[0], point.c[1], point.c[2], 170 * age * age);
                p.circle(point.x, point.y, radius * 2 * (0.25 + 0.6 * age));
            });

            const c = dot.color();
            p.fill(c[0], c[1], c[2]);
            p.circle(pos.x, pos.y, radius * 2);
        }
    };
};

new p5(dotsAnimation);
