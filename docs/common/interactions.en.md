#### Introduction

Interaction is an important API in G2, and it is a way to load G2's built-in interactions or custom Interaction interactions based on the Interaction syntax form. G2 4.0 has made a big change in terms of interaction. All interaction code is intrusive and is organized through interaction syntax. The way to use the interaction is also very simple, you just need to set the name of the interaction.

In G2Plot, G2's interaction syntax is passed through, as well as some built-in interactions with specific plot bindings.

Usage:

```ts
// Enable the Active interaction when the mouse moves over a chart element (bar in a bar, dot in a dot, etc.)
interactions: [{ type: 'element-active' }];

// Enable multiple interactions
interactions: [{ type: 'element-active' }, { type: 'brush' }];
```

#### Remove the interaction

```ts
plot.chart.removeInteraction('interaction-type');
```

Usage:

```ts
// Removes legend filtering interaction
plot.chart.removeInteraction('legend-filter');
```

#### More

More instructions about interaction, see [G2 document] (https://g2.antv.vision/en/docs/api/general/interaction)

The list of built-in supported interactions and interactions with specific plot bindings will be added later.
