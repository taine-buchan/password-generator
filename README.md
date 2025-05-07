**WIP** Password Generator 

A tool for generating random passwords with customizable options.

Current Implementation:
Uses Math.random() for basic randomness (note: not cryptographically secure).

Features adjustable length and character sets (symbols, numbers, etc.).

Includes copy/clear functionality.

Planned Security Upgrades:
🔒 Replacing Math.random() with the Web Crypto API’s crypto.getRandomValues() for:

Stronger entropy via typed arrays (Uint8Array).

Protection against predictability attacks.

✨ Future Features:

Password strength meter.

Exclusion of ambiguous characters (e.g., l vs 1).

Note: This project is a work in progress—security improvements are actively being researched .
