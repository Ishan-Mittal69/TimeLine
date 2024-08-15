import React, { useState, useCallback } from 'react';
import { Tldraw } from 'tldraw';
import 'tldraw/tldraw.css';
import { Input } from "./components/ui/input";
import { Button } from './components/ui/button';
import EditableContentBox from "./components/ui/EditableContentBox";

export default function Timeline() {
  const [numItems, setNumItems] = useState(0);
  const [editor, setEditor] = useState(null);
  const [contentBoxes, setContentBoxes] = useState([]);
  const [content, setContent] = useState({}); 

  const handleGenerate = useCallback(() => {
    if (editor) {
      const shapes = [];
      const boxes = [];
      const shapeWidth = 10;
      const shapeHeight = 10;
      const spacing = 150;

      const { width: canvasWidth, height: canvasHeight } = editor.getViewportPageBounds();
      const totalWidth = (numItems * shapeWidth) + ((numItems - 1) * spacing);
      const startX = (canvasWidth - totalWidth) / 2;
      const centerY = canvasHeight / 2;

      shapes.push({
        id: `shape:timeline-horizontal`,
        type: 'line',
        x: startX - ((shapeWidth + spacing)),
        y: centerY + shapeHeight / 2,
        props: {
          dash: 'draw',
          size: 'm',
          color: 'black',
          spline: 'line',
          points: {
            a1: { id: 'a1', index: 'a1', x: 0, y: 0 },
            a2: { id: 'a2', index: 'a2', x: spacing+10, y: 0 }
          },
          scale: 1
        },
      });

      for (let i = 0; i < numItems; i++) {
        const shapeX = startX + (i * (shapeWidth + spacing));

        shapes.push({
          id: `shape:timeline-item-${i}`,
          type: 'geo',
          x: shapeX,
          y: centerY,
          props: {
            w: shapeWidth,
            h: shapeHeight,
            fill: 'solid',
            text: "",
            geo: 'ellipse',
          },
        });

        if (i % 2 === 0) {
          shapes.push({
            id: `shape:timeline-vertical-above-${i}`,
            type: 'line',
            x: shapeX + shapeWidth / 2,
            y: centerY - 2,
            props: {
              dash: 'draw',
              size: 'm',
              color: 'black',
              spline: 'line',
              points: {
                a1: { id: 'a1', index: 'a1', x: 0, y: 0 },
                a2: { id: 'a2', index: 'a2', x: 0, y: -35 }
              },
              scale: 1
            },
          });
        }

        if (i < numItems) {
          shapes.push({
            id: `shape:timeline-horizontal-${i}`,
            type: 'line',
            x: shapeX + shapeWidth,
            y: centerY + shapeHeight / 2,
            props: {
              dash: 'draw',
              size: 'm',
              color: 'black',
              spline: 'line',
              points: {
                a1: { id: 'a1', index: 'a1', x: 0, y: 0 },
                a2: { id: 'a2', index: 'a2', x: spacing, y: 0 }
              },
              scale: 1
            },
          });
        }

        if (i % 2) {
          shapes.push({
            id: `shape:timeline-vertical-below-${i}`,
            type: 'line',
            x: shapeX + shapeWidth / 2,
            y: centerY + shapeHeight / 2 + 5,
            props: {
              dash: 'draw',
              size: 'm',
              color: 'black',
              spline: 'line',
              points: {
                a1: { id: 'a1', index: 'a1', x: 0, y: 0 },
                a2: { id: 'a2', index: 'a2', x: 0, y: 35 }
              },
              scale: 1
            },
          });
        }

        shapes.push({
          id: `shape:timeline-time-${i}`,
          type: 'text',
          x: shapeX - spacing / 3,
          y: centerY + (i % 2 === 0 ? -65 : 45),
          props: {
            text: content[`shape:timeline-time-${i}`] || 'time period',
            size: 's',
            autoSize: true,
            textAlign: 'start',
            color: 'black',
          },
        });

        shapes.push({
          id: `shape:timeline-text-${i}`,
          type: 'text',
          x: shapeX - spacing / 3,
          y: centerY + (i % 2 === 0 ? -105 : 75),
          props: {
            text: content[`shape:timeline-text-${i}`] || 'content',
            size: 'm',
            autoSize: true,
            textAlign: 'start',
            color: 'grey',
          },
        });

        boxes.push(
          <React.Fragment key={i}>
            <span>{i+1}</span>
            <EditableContentBox
              index={i} 
              style={{ padding: 4, width: '40%', height: '30px', resize: 'none', borderRadius: 2 }}
              placeholder={'Time period'}
              onChange={(index, newText) => handleContentBoxTimeChange(index, newText)}
            />
            <EditableContentBox
              index={i} 
              placeholder={'Content'}
              onChange={(index, newText) => handleContentBoxContentChange(index, newText)}
            />
          </React.Fragment>
        );
      }

      editor.createShapes(shapes);
      editor.zoomToFit();
      setContentBoxes(boxes);
    }
  }, [editor, numItems, content]);

  const handleContentBoxTimeChange = (index, newText) => {
    const shapeId = `shape:timeline-time-${index}`;
    setContent((prev) => ({
      ...prev,
      [shapeId]: newText,
    }));
    if (editor) {
      editor.updateShapes([
        {
          id: shapeId,
          type: 'text', 
          props: { text: newText },
        },
      ]);
    }
  };

  const handleContentBoxContentChange = (index, newText) => {
    const shapeId = `shape:timeline-text-${index}`;
    setContent((prev) => ({
      ...prev,
      [shapeId]: newText,
    }));
    if (editor) {
      editor.updateShapes([
        {
          id: shapeId,
          type: 'text', 
          props: { text: newText },
        },
      ]);
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div style={{ flex: '0 0 33%', padding: '20px', overflowY: 'auto' }}>
        <Input
          value={numItems}
          onChange={(e) => setNumItems(Math.max(0, Math.min(10, parseInt(e.target.value) || 0)))}
          placeholder="Number of timeline items"
          style={{ marginBottom: '10px', padding: '5px', width: '100%', textAlign: 'center' }}
        />
        <Button onClick={handleGenerate} style={{ padding: '10px', width: '100%' }}>
          Generate Timeline
        </Button>
        <div className="mt-4">
          {contentBoxes}
        </div>
      </div>
      <div style={{ flex: '1', overflow: 'hidden' }}>
        <div className="tldraw__editor h-3/5 p-5" style={{ height: '80%' }}>
          <Tldraw
            hideUi
            onMount={setEditor}
            cameraOptions={{
              minZoom: 1,
              maxZoom: 1,
              zoomSpeed: 0,
              panSpeed: 0
            }}
          />
        </div>
      </div>
    </div>
  );
}
