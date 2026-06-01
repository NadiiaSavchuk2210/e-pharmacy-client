import { revalidateTag } from 'next/cache';

import {
  getRevalidateSecret,
  getTagsForRevalidatePayload,
  readRevalidatePayload,
  REVALIDATE_SECRET_HEADER,
} from './route.helpers';

import type { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  const secret = getRevalidateSecret();

  if (!secret) {
    return Response.json(
      { message: 'REVALIDATE_SECRET is not configured' },
      { status: 500 },
    );
  }

  if (request.headers.get(REVALIDATE_SECRET_HEADER) !== secret) {
    return Response.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const payload = await readRevalidatePayload(request);

  if (!payload) {
    return Response.json({ message: 'Invalid JSON body' }, { status: 400 });
  }

  const tags = getTagsForRevalidatePayload(payload);

  if (!tags) {
    return Response.json(
      {
        message:
          'Unsupported revalidation event or missing required identifier',
      },
      { status: 400 },
    );
  }

  tags.forEach((tag) => {
    revalidateTag(tag, 'max');
  });

  return Response.json({
    revalidated: true,
    tags,
  });
}
