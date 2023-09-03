# Neatenize
Single-page web application created with JavaScript and Firebase

## Table of Contents
- [Summary](#summary)
- [Technologies](#technologies)
- [Features](#features)
- [Currently in development](#currently-in-development)
- [Use cases](#use-cases)
- [Project status](#project-status)

### Summary
Neatenize is a simple, easy-to-use checklist to help you reorganize, tidy up, and clean out. It’s loosely based on the Konmari method, which sorts items by category instead of room.

While it’s a very thorough list, it’s not exhaustive; not all categories will apply to your needs, and you may have other categories not on this list. Use Neatenize as a starting point and framework.

Try it out today at [Neatenize](https://neatenize.app/).

### Development
I developed Neatenize as a practice project to improve my JavaScript skills and gain familiarity with Firebase.  It was built with the intention of allowing users to access the checklist without needing an account; creating an account allows them to save and sync their progress between devices.  I also wanted to make sure it's accessible to people who prefer paper checklists by creating a printer-friendly version.

### Technologies
Neatenize was built using the Bootstrap 5.1 framework, Firebase, HTML, CSS, and JavaScript.  The code that creates the checklist cards and items iterates through a JSON file, for better maintainability and editing.

I designed it to be used on all devices, from 375px wide and larger.  The interface is fully responsive across all screen sizes.

### Features
- Check off individual items in a category list
- When a category list is complete, a green check mark appears on the upper left as an overlay.  This check mark disappears if a child checkbox is unchecked.
- Save and sync progress across devices
- Expand all category lists
- Collapse all category lists
- Collapse all completed category lists

### Currently in development
- Progressive Web Application
- Additional checklists (for example, emergency preparedness)
- Retaining whether a user has expanded or collapsed a specific category list
- Allowing user to select whether to auto-collapse completed category lists

### Use cases
Neatenize is intended to help anyone who wants to reorganize, declutter, clean out, or otherwise improve their living space.  By breaking a home's contents into primary categories, then smaller subcategories (clothing > shirts) it makes this process much more manageable and less overwhelming.

Neatenize can be used on mobile phones, tablets and computers, as well as be printed to use as a paper checklist.  Unfortunately, I haven't yet figured out a way to sync progress between the printed paper checklists and Neatenize's web version ;)

### Project status
Neatenize is being actively maintained.  Bugs are logged and fixed as discovered.
