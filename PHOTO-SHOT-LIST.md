# Photo shot list

Concrete shots to take, in priority order. See `ORIGINALITY-PLAYBOOK.md` for the
wider strategy and `WRITING-STYLE.md` for why photos matter more than word count
on this site.

## The three rules that make a photo count

1. **Same angle, same spot, same light.** Mark where your feet go. An "after"
   shot taken at noon when the "before" was at night proves nothing except that
   it was noon. This is the single most common way a before and after pair
   becomes worthless.
2. **Leave the surroundings alone.** Do not tidy the shelf between shots. The
   bottles staying in exactly the same position is what makes a viewer believe
   the pair, and it is the detail that separates a real photo from a staged one.
   The tub photo already on the site works for precisely this reason.
3. **Shoot the mess before you start.** Every one of these is lost the moment
   you clean without photographing. Take the "before" even if you are not sure
   you will use it.

Import each one with:

```bash
node scripts/import-photos.mjs --slug=<post-slug> <file>
# or, for two separate frames rather than one composite:
node scripts/import-photos.mjs --slug=<post-slug> --pair <before.jpg> <after.jpg>
```

That strips GPS from the file, fixes rotation, resizes, and writes a Pinterest
crop. Never skip it and copy a phone photo in by hand, because the raw file
contains the coordinates of your house.

---

## Priority 1: posts already rewritten and clean, missing only a photo

These five have honest text at 3,000+ words. A real photo is the only thing left
that a competitor cannot reproduce.

### 1. Grout, half treated, in one frame
**Post:** `16-hydrogen-peroxide-cleaning-hacks`
Spread the peroxide and baking soda paste along **half** a run of grout lines and
leave the other half bare, then shoot the boundary straight on. One frame showing
treated and untreated grout side by side in the same lighting is more convincing
than any before and after pair, because there is no gap in time to doubt.
Then a second shot after scrubbing and rinsing.

### 2. Shower door with one stripe wiped clear
**Post:** `8-easy-wd40-cleaning-hacks`
Mist the glass, wait the two minutes, then wipe **one vertical stripe** top to
bottom and stop. Shoot through the door with light behind it so the film on the
untouched glass reads clearly against the clear stripe. This is the whole
argument of that post in a single image.

### 3. The drain pump filter and what came out of it
**Post:** `9-laundry-room-cleaning-hacks-that-actually-save-time`
Two frames. The open access panel with the filter partly unscrewed, and the
filter out on a towel with the lint, hair and coins beside it. Most people do not
know this filter exists, which makes this the highest value shot on the list.
Put the tray down first, it will release water.

### 4. Behind the dryer, before and after
**Post:** `9-laundry-room-cleaning-hacks-that-actually-save-time`
Machine pulled out, floor and wall lint visible, then the same angle cleared.
Unplug it first. If the lint layer is thick, that photo makes the fire risk point
better than any sentence.

### 5. The doorway declutter pair
**Post:** `how-to-declutter-your-room`
Stand in the doorway, one wide shot before anything moves, and the same doorway
at the same time of day after. The post opens on the chair that has not been a
chair in months, so if that chair exists in your house, it belongs in frame.

### 6. A light tile floor showing every crumb
**Post:** `best-floor-colors-to-hide-dust-and-dirt` (already has one, a second helps)
The existing photo covers debris on light tile. What would strengthen it is a
**dark** floor in the same house photographed with the same dust on it, so the
comparison is about the color rather than about the mess.

---

## Priority 2: shots for posts still being rewritten

Take these when convenient. The text work is queued and the photos will slot in.

### 7. The lint screen water test
**Post:** `9-laundry-room-cleaning-hacks-that-actually-save-time`
Water pooling on top of the mesh instead of running through, held under the tap.
Almost nobody has seen this photographed and it demonstrates an invisible problem.

### 8. Microwave interior, before and after
**Post:** `12-microwave-cleaning-hacks-for-a-sparkling-kitchen`
Door open, spatter on the roof and turntable, then the same after the steam and
wipe. Shoot the roof specifically, since that is the part people miss.

### 9. Kettle interior scale
**Post:** `how-to-remove-limescale-from-a-kettle`
Looking down into the kettle at the element and base with the scale visible, then
the same after descaling. Use the flash, the inside of a kettle is dark.

### 10. Mold on bathroom caulk, close
**Post:** `how-to-remove-mold-from-bathroom-caulk`
Tight on the caulk line so the black speckling in the silicone is legible. The
post distinguishes surface growth from staining that has grown into the caulk, so
if you have both, photograph both and note which is which.

### 11. Cast iron before and after a restore
**Post:** `how-to-deep-clean-a-cast-iron-skillet`
The rusty or sticky pan, then the same pan after scrubbing and re-seasoning.
Shoot straight down under window light rather than overhead kitchen light, which
flattens the surface and hides the sheen that shows a good season.

### 12. Yellowed shirt underarm, before and after
**Post:** `how-to-remove-yellow-armpit-stains-from-shirts`
Flat on a white surface, same fold, same daylight. Pin the shirt so the fabric
lies identically in both frames, since a different drape changes how the stain
reads and would make the pair look manipulated even when it is honest.

### 13. Sponge in the microwave or the dishwasher basket
**Post:** `how-to-sterilize-kitchen-sponge`
Less about before and after, more about method. A photo of the actual setup is
what makes an instruction credible.

### 14. Air fryer basket, greasy then clean
**Post:** `how-to-clean-an-air-fryer`
Include the underside of the heating element if you can reach it safely with the
unit unplugged and cool, because that is the part every article on this topic
skips.

---

## Also worth capturing: field notes

A photo answers "did this happen". `fieldNotes` answers "what happened". Two
sentences per shot is enough, and it is the only place on this site where first
person is allowed:

- The date.
- The specific surface, for example "12 year old glass shower door, hard water
  area".
- How long it actually took, including dwell time.
- What happened, including the parts that did not work.
- What you would do differently.

Partial and honest beats tidy. "Took two rounds, the corner by the drain never
fully cleared" is worth more to a reader, and to a reviewer, than a clean success
story.
