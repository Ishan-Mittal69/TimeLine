
# Time Line

A Timeline creator made using TL Draw, react

# Approach
- **Shape Generation**: Shapes are dynamically generated based on user input (number of items) and positioned on a timeline. The shapes include circles for timeline items, lines connecting them, and vertical lines indicating milestones. Text shapes are also generated for labels and content.

- **Editable Content Boxes**: Text boxes outside the Tldraw component allow users to input time periods and content, which update the corresponding text shapes on the timeline. This approach separates content management from shape manipulation.
<h4> Making the Timeline Un editable: </h4>

- Fixed Zoom and Pan: The camera options are set to prevent zooming and panning, ensuring the timeline remains static.
- Hiding UI Controls: The Tldraw UI controls are hidden to prevent any inadvertent editing.

<h1> Challenges Faced </h1> 
  
- **Dynamic Shape Positioning**:

1. **Dynamic Shape Positioning and Creation**:
-  **Challenge**: Positioning the shapes on the timeline dynamically, especially when dealing with variable numbers of items, required careful calculation of spacing, alignment, and centering.
 - **Solution**: Calculated the starting positions and ensured consistent spacing and alignment across all timeline items, including handling odd and even item placements differently. 
2. **Rendering and Managing Multiple Shapes**:

-   **Challenge**: Dynamically creating and managing a large number of shapes, lines, and text elements without performance issues was critical.
-   **Solution**: leveraged React’s state management to create and update the necessary shapes efficiently.
3. **Ensuring Cross-Component Communication**:

-   **Challenge**: Ensuring smooth communication between the input components and the `Tldraw` editor, especially with regard to updating the timeline content dynamically, required careful coordination.
-   **Solution**: Implemented callback functions to handle updates and keep the `Tldraw` component synchronized with the external inputs.
