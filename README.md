# Time Line

A Timeline creator made using TL Draw, react

# Approach
- Shape Generation: Shapes are dynamically generated based on user input (number of items) and positioned on a timeline. The shapes include circles for timeline items, lines connecting them, and vertical lines indicating milestones. Text shapes are also generated for labels and content.

- Editable Content Boxes: Text boxes outside the Tldraw component allow users to input time periods and content, which update the corresponding text shapes on the timeline. This approach separates content management from shape manipulation.

- Making the Timeline Uneditable:

- Disabling Shape Interaction: Interaction with shapes is disabled by overriding pointer event handlers.
- Fixed Zoom and Pan: The camera options are set to prevent zooming and panning, ensuring the timeline remains static.
- Hiding UI Controls: The Tldraw UI controls are hidden to prevent any inadvertent editing.
