// Cloudflare Pages Function endpoint for leads

let memoryLeads = [];

export async function onRequestGet(context) {
  try {
    // If we have a Cloudflare KV bound, e.g. context.env.LEADS_KV
    if (context.env && context.env.LEADS_KV) {
      const storedLeads = await context.env.LEADS_KV.get('all_leads');
      if (storedLeads) {
        return new Response(storedLeads, {
          headers: { 'Content-Type': 'application/json' }
        });
      }
    }
    // Fallback to in-memory array (clears on worker restart)
    return new Response(JSON.stringify(memoryLeads), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

export async function onRequestPost(context) {
  try {
    const leadData = await context.request.json();
    const newLead = {
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      status: 'new', // new, in_progress, contacted, archive
      ...leadData
    };

    memoryLeads.unshift(newLead);

    // Save to KV if bound
    if (context.env && context.env.LEADS_KV) {
      await context.env.LEADS_KV.put('all_leads', JSON.stringify(memoryLeads));
    }

    return new Response(JSON.stringify({ success: true, lead: newLead }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

export async function onRequestDelete(context) {
  try {
    const url = new URL(context.request.url);
    const id = url.searchParams.get('id');
    if (!id) {
      return new Response(JSON.stringify({ error: 'ID is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    memoryLeads = memoryLeads.filter(lead => lead.id !== id);

    if (context.env && context.env.LEADS_KV) {
      await context.env.LEADS_KV.put('all_leads', JSON.stringify(memoryLeads));
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
