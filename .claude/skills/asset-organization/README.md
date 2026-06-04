# Asset Organization

Mandatory rules for image and visual asset management in **festiVAL**.

## Purpose

Keep repository assets clean, scalable, searchable, and production-ready. Asset organization is part of code quality and must be reviewed during project structure audits.

## Folder structure

All images must be organized into logical folders based on their purpose. Use dedicated subfolders under `assets/images/` such as:

- `assets/images/festivals/`
- `assets/images/locations/`
- `assets/images/icons/`
- `assets/images/ui/`
- `assets/images/backgrounds/`
- `assets/images/temp/`

Images must **never** be stored directly in the root `assets/images/` directory.

## File naming

Every image file must be renamed to a clear, descriptive, and consistent name before being committed.

File names must:

- use lowercase only
- use kebab-case
- avoid spaces, special characters, accents, and generic names
- reflect the actual content of the image

Bad examples:

- `IMG_1234.jpg`
- `screenshot.png`
- `image-final-final-v2.png`
- `photo1.jpg`

Good examples:

- `fallas-monument-main.jpg`
- `tomatina-crowd-2025.webp`
- `festival-card-background.png`
- `search-icon.svg`
- `valencia-city-skyline.jpg`

## Required workflow when adding images

Whenever new images are added:

- verify the correct destination folder
- rename the file if necessary
- remove duplicate or obsolete assets
- keep the asset structure clean and scalable

## AI assistant responsibilities

AI assistants working on this repository must automatically:

- detect poorly named image files
- suggest better names
- place images in the most appropriate folder
- warn when an image does not follow these asset organization rules

## Review rule

Asset organization is part of project structure quality and must be reviewed during structure audits.
