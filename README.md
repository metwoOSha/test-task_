# Brewery List App

## Description

A **Next.js + Zustand** app that displays breweries from the Open Brewery DB API.  
It keeps exactly **15 items rendered** at all times, supports multiple selection, deletion, and lazy scroll.

## Features

-   Fetch breweries on initial load and store them in Zustand.
-   Always render exactly **15 breweries**.
-   Multiple selection via right‑click; deselect with another click.
-   Show **Delete** button when at least one item is selected.
-   Deleting removes selected items but list is refilled to keep 15.
-   Left‑click navigates to a single brewery page.
-   If local data runs out, fetch the next API page.
-   Lazy scroll: only 5 visible at a time, but DOM always holds 15.

## Tech Stack

-   Next.js
-   Zustand
-   TypeScript
