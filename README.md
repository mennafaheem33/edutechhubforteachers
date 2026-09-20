# Remix of EduTech Navigator

🎯 Project Overview

Create a modern, interactive educational web platform called EduTech Hub.

The platform should function as an AI-powered educational tools directory and dashboard designed specifically for teachers.

EduTech Hub will organize and present EdTech and AI tools used in education, based on the tools listed in the attached Microsoft OneNote notebook.

The goal is to help teachers quickly discover, filter, and access educational AI tools relevant to their subjects and needs.

The platform must deliver a clean SaaS-style experience, combining modern UI design, smooth filtering, and intelligent search.

👩‍🏫 Target Users

Primary users are:

School teachers

Educational content creators

Curriculum developers

Trainers

Educational technology enthusiasts

The interface should therefore feel:

Professional

Intuitive

Fast and responsive

Teacher-friendly

🧠 Core Functionalities

The platform must allow users to:

Filter tools by subject

Teachers should be able to select the subject they teach.

Filter tools by creation goal

Teachers should select what they want to create today.

Sort tools

Tools should be sortable using multiple sorting methods.

Classify tools

Each tool must belong to one of two classifications:

AI Tools

EdTech Tools

Search tools

Users must be able to search tools by name using a real-time search bar.

Access official websites

Each tool card must contain:

Official tool logo

Tool name

Clickable official link

Share filtered results

Users must be able to share the current filtered page via URL with all filters preserved.

🧠 CRITICAL FEATURE

Shareable Filter State (High Priority)

This is one of the most important functional requirements.

When a user:

Selects a subject

Selects a creation category

Chooses a sorting method

Chooses AI Tools or EdTech Tools

Then copies or shares the page URL, the link must preserve the selected state.

Example Behavior

If a user selects:

Subject: English

Category: Image Generation

Sort: Top Picks

Tool Type: AI Tools

The URL should become something like:

Copy code

 

?subject=english&category=image-generation&sort=top-picks&type=ai

When another user opens this link:

The page must load with the same filters already applied

The UI must reflect the active filters

The tool grid must display the correct results

The page must NOT reset to default filters.

⚙️ Technical Implementation Requirements

To achieve shareable filters:

Use URL Query Parameters

Store filter state using query parameters such as:

Copy code

 

?subject=english

&category=image-generation

&sort=top-picks

&type=ai

&search=chatgpt

On Page Load

The application must:

Read query parameters

Apply filters automatically

Sync UI state with the parameters

Display filtered results accordingly

On Filter Change

When users modify filters:

Update the URL dynamically

Do not reload the page

Keep the UI state synchronized

This must work smoothly with Lovable’s routing system.

🖥️ Website Layout Structure

🔹 Header Section

Position: Top of the page

Left Side

Large placeholder area for the website logo.

Requirements:

Logo must be large and clearly visible : make the logo larger (3 times its size)

Two logos will be provided:

"Light mode" logo

"Dark mode" logo

Behavior:

Use Light mode logo in light theme

Use Dark mode logo in dark theme

Center

Search bar for searching tools by name.

Features:

Real-time search

Works together with filters

Optional: update URL query parameter

Right Side

Controls:

🌐 Language Toggle

🌙 Dark / Light Mode Toggle

🔎 Filters Section

Position: Below the header

1️⃣ Subject Filter

Rename label from "Subject" to the question:

"What subject do you teach?"

Display style:

Outlined stroke buttons

Clear selected state

Only one subject active at a time

Subjects from OneNote:

Arabic

English

Subjects

German

French

Math

Science

ICT

Religion

Christianity

Philosophy

Montessori

Social Studies

Business

Skills

Art

Music and Songs

PE

Library

2️⃣ Creation Goal Filter

Rename label from "Category" to:

"What would you like to create today?"

Display style:

Outlined stroke buttons

Single selection

Options include:

Text Generation

Lesson Planning

Quizzes and Worksheets

Presentation

Photo Generation

Video Generation

Story Book Creation

Text to Speech

Lip Sync

VR and AR

Gamification

Quick Prompts

Chatbots

Prompt Maker

Courses

3️⃣ Sorting Filter

Display as Dropdown Menu

Sorting options:

A → Z

Z → A

Top Picks

Sorting changes must update the URL query parameters.

4️⃣ Tool Type Filter

Filter by tool classification:

Options:

AI Tools

EdTech Tools

🔍 Search System

The search bar should:

Filter tools by name

Work in real-time

Combine with other filters

Optionally update URL query parameter

Example:

Copy code

 

?search=canva

🧩 Tools Display Section

Display tools in a responsive grid layout.

Each tool card must include:

Official logo

Tool name

Clickable link to official website

UI features:

Clean card layout

Smooth hover animation

Subtle elevation effect

Smooth transitions when filtering

Design inspiration:

Modern SaaS dashboards

🌍 Language System

Default language:

English

Users can switch to:

Arabic

When Arabic is activated:

Entire interface switches to Arabic

RTL layout automatically enabled

All labels and filters translated

Language preference should:

Persist during the user session

🌙 Dark / Light Mode

Toggle located in the header.

Requirements:

Smooth transition animation

Preference saved in local storage

Dark mode background color:

Copy code

 

#313d62

🎨 Design & UI Style

Overall design direction:

Modern Educational SaaS Platform

Visual Style

Clean and minimal

Not visually overwhelming

Teacher-friendly

Soft educational tone

Color Palette

Inspired by the attached logos: Light Mode Palette

This palette focuses on a clean, academic, and highly readable interface. The pure white and soft gray backgrounds allow the primary logo colors to pop, creating a very focused user experience.

| Role | Hex Code | Color Preview | Usage Guidelines |

|---|---|---|---|

| Background | #F8FAFC | Soft Slate Gray | Use as the main app/website background to reduce eye strain compared to pure white. |

| Surface | #FFFFFF | Pure White | Use for cards, navigation bars, and modal windows to create depth. |

| Primary Text | #1B2433 | Dark Ink | Use for headings and body text. It’s softer than pure black, offering better readability. |

| Primary CTA | #1B3B6F | EduTech Navy | Use for primary buttons, active states, and important links. |

| Accent / Alert | #9B1B22 | EduTech Red | Use sparingly for badges, error states, or secondary call-to-action buttons. |

| Soft Accent | #4E6E9B | Pencil Blue | Pulled from the robot's pencil. Great for informational tags, secondary icons, or subtle borders. |

Dark Mode Palette

This palette uses the exact slate-blue background from your second image. In dark mode, the contrast needs to be managed carefully, so the typography is shifted to off-white, and the interactive colors are slightly brightened to ensure they remain accessible and legible against the dark background.

| Role | Hex Code | Color Preview | Usage Guidelines |

|---|---|---|---|

| Background | #313D5A | Deep Slate | The core background color, matching the dark logo image. |

| Surface | #3E4C6D | Elevated Slate | A slightly lighter slate for cards, dropdowns, and elevated UI elements. |

| Primary Text | #F1F5F9 | Off-White | Use for headings and body text to prevent the glowing effect that pure white can cause on dark backgrounds. |

| Primary CTA | #6A8EBE | Light Pencil Blue | A brightened version of the pencil blue. Excellent for buttons and links in dark mode for high visibility. |

| Accent / Alert | #E23A43 | Bright Red | A slightly more vibrant version of the logo red to ensure it passes contrast checks on the dark slate background. |

| Muted Text | #94A3B8 | Cool Gray | Use for secondary text, placeholders, or disabled states

 

Primary palette:

Educational blues

Neutral tones

Soft contrast

Background

Subtle educational theme including:

Teachers

Books

Learning elements

Should be very light and non-distracting.

Typography

Clear

Friendly

Professional

Highly readable

📱 Responsiveness

The website must be fully responsive and optimized for:

Desktop

Tablet

Mobile

Grid and filters should adapt smoothly to smaller screens.

🧱 Component Structure

Use a clean modular component structure, including:

Header

Filters

Tool Cards

Grid Layout

Language System

Theme System

URL State Manager

🧠 Data Handling

All tools from the OneNote notebook should be imported.

Each tool must include:

Tool Name

Logo

Official Link

Subject tags

Category tags

Tool type (AI or EdTech)

⚠️ Handling Missing Subject Tools

If a subject from the list does not have specific tools in the OneNote notebook, the system should:

Add relevant general educational websites appropriate for that subject.

Example:

General educational platforms usable across subjects.

Purpose:

Prevent empty filter results

Maintain a useful experience for teachers

🚀 Expected Result

EduTech Hub should feel like a high-quality professional SaaS platform for educators.

The platform should:

Be intuitive and fast

Allow powerful filtering

Support shareable filtered links

Offer bilingual interface

Support dark/light mode

Feel innovative and inspiring for teachers

📝 Footer Credit

At the bottom of the website, include the text:

Developed by: Menna Faheem

 Note1:⚡ Quick Prompts Tab Behavior

The “Quick Prompts” category should behave differently from the other tool categories.

Instead of displaying external AI tools with logos and links, the Quick Prompts section should display ready-to-use prompt templates for teachers.

🧩 Display Format

When the user selects the filter:

“What would you like to create today?” → Quick Prompts

The tools grid should switch to a prompt library layout.

Instead of tool cards, the page should display prompt text boxes.

📦 Prompt Box Layout

Each prompt should appear inside a clean, modern text container.

Each prompt card must include:

Prompt Title

Example:

Lesson Plan Generator

Quiz Creator

Classroom Icebreaker

Story Starter

Homework Worksheet Creator

Prompt Text Box

The prompt content should be displayed inside a readable text box.

Features:

Multi-line text

Clear typography

Light background for readability

Scrollable if long

Example layout:

Copy code

 

Prompt Title

----------------------------------

 

[ Text Box ]

 

"Create a 45-minute lesson plan for teaching

the topic of photosynthesis to Grade 6 students.

 

Include:

• Learning objectives

• Warm-up activity

• Main explanation

• Student activity

• Exit ticket question."

📋 Copy Prompt Feature

Each prompt card should include a Copy Prompt button.

Button behavior:

Copies the full prompt text to clipboard

Shows a small confirmation message such as:

“Prompt copied!”

🎨 Design Style

Prompt boxes should follow the same EduTech Hub design system.

Design requirements:

Rounded corners

Soft shadows

Clean typography

Comfortable reading spacing

Subtle hover animation

The layout should still remain responsive grid style.

🔎 Search Behavior

When the Quick Prompts tab is active, the search bar should:

Search within:

Prompt titles

Prompt text

This allows teachers to quickly find prompts like:

lesson

quiz

writing

discussion

worksheet

🔗 URL Behavior

The Quick Prompts category must also be shareable via URL.

Example:

Copy code

 

?category=quick-prompts

Opening this link should automatically:

Activate the Quick Prompts filter

Display the prompt library view

🧠 Purpose of Quick Prompts

The Quick Prompts section should act as a mini prompt library for teachers, allowing them to:

Quickly copy effective AI prompts

Save time when preparing lessons

Use prompts with tools like ChatGPT or other AI assistants

 Note2:Add "All" tab to the first 2 filters & add a one line description for each tool to show what it is used for

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://edutechhubforteachers.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/e7a587db-e7ba-4aae-824f-836de1042932).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
