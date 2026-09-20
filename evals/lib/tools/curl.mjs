// Send an HTTP request and return the response body.
import { tool } from 'ai';
import { z } from 'zod';

export const curl = tool({
  description:
    'Send an HTTP request and return the response body. Use it for the AntV context retrieval service ' +
    '(GET https://sive.antv.antgroup.com/api/v1/context/retrieve?query=...&library=g2) when local docs cannot cover a G2 v5 API.',
  inputSchema: z.object({
    url: z.string().describe('Full URL including query string'),
    method: z.enum(['GET', 'POST']).default('GET'),
  }),
  execute: async ({ url, method }) => {
    try {
      const res = await fetch(url, { method });
      return await res.text();
    } catch (err) {
      return `Error: request failed: ${err.message}`;
    }
  },
});
