import React, { useEffect, useRef } from "react";
import mermaid from "mermaid";

mermaid.initialize({
  startOnLoad: false,
  theme: "default",
  securityLevel: "loose",
});

const cleanMermaidChart = (diagram) => {
  if (!diagram) return "";

  let clean = diagram.trim();

  // remove markdown blocks
  clean = clean.replace(/```mermaid/g, "");
  clean = clean.replace(/```/g, "");

  // normalize line breaks
  clean = clean.replace(/\r\n/g, "\n");

  // keep graph section only
  const graphMatch = clean.match(/graph\s+(TD|LR|RL|BT)/);

  if (graphMatch) {
    clean = clean.slice(graphMatch.index);
  }

  return clean.trim();
};

// Fix invalid nodes
const fixMermaidNodes = (diagram) => {
  let index = 0;

  const used = new Map();

  return diagram.replace(/\[(.*?)\]/g, (match, label) => {

    // normalize label for key
    const key = label.trim();

    // reuse same node if label already seen
    if (used.has(key)) {

      return used.get(key);

    }

    index++;

    const id = `N${index}`;

    const node = `${id}["${key}"]`;

    used.set(key, node);
  return node;

  });
};

function Mermaidsetup({ diagram }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!diagram || !containerRef.current) return;

    const renderDiagram = async () => {
      try {
        // clear old diagram
        containerRef.current.innerHTML = "";

        // clean chart
        let safeChart = cleanMermaidChart(diagram);

        // fix invalid nodes
        safeChart = fixMermaidNodes(safeChart);

        console.log("FINAL MERMAID:");
        console.log(safeChart);

        // unique id
        const uniqueId = `mermaid-${Date.now()}`;

        // render diagram
        const result = await mermaid.render(uniqueId, safeChart);

        const svg = result.svg || result;

        // show svg
        containerRef.current.innerHTML = svg;

      } catch (error) {
        console.error("FULL ERROR:", error);

        containerRef.current.innerHTML = `
          <div style="color:red;padding:10px;font-weight:bold;">
            Diagram failed to render
          </div>
        `;
      }
    };

    renderDiagram();

  }, [diagram]);

  return (
    <div className="bg-white border rounded-lg p-4 overflow-x-auto">
      <div ref={containerRef}></div>
    </div>
  );
}

export default Mermaidsetup;