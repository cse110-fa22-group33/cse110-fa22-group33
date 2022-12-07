# Padding Type and Display

## Context and Problem Statement

Should there be one or two kinds of paddings?
Should there be a difference the way that different padding types are displayed?

## Considered Options

### Original Padding Functionality:
* One kind of padding that users set to block out specific time
* Appears as gray boxes in weekly calendar

### Second Padding Type:
* Allow users to set second padding type to block out sleep and lunch time
* These recur everyday

## Decision Outcome

### Dual Padding Type and Differentiation in Display
* Have two padding types:
  * A daily recurring type for sleep and lunch time
  * A unique padding type for specific timeslot set by user
* Recurring padding will be dark gray boxes with no label
* Unique padding will set correct task category color and display name