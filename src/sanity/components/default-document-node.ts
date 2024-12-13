import pageRegistry from '@/resources/page-registry';
import type { SanityDocument } from 'sanity';
import { Iframe } from 'sanity-plugin-iframe-pane';
import type { DefaultDocumentNodeResolver } from 'sanity/structure';
import { studioUrl } from '../lib/env';

const generateIsDraftSearchParams = (url: string) => `${url}?isDraft=true`;

function getPagePreviewUrl(doc: SanityDocument & { slug?: { current: string } }) {
  return doc?.slug?.current ? `${studioUrl}/${pageRegistry.get(doc?.slug?.current)}` : `${studioUrl}`;
}

function getContentBlockPreviewUrl(doc: SanityDocument & { slug?: { current: string } }) {
  return doc?.slug?.current ? `${studioUrl}/component-list/${doc?.slug?.current}` : `${studioUrl}`;
}

function getProductPreviewUrl(doc: SanityDocument & { slug?: { current: string }; productType?: string }) {
  if (doc.productType === 'tour') {
    return doc?.slug?.current ? `${studioUrl}/tour/${doc?.slug?.current}` : `${studioUrl}`;
  }
  if (doc.productType === 'destination') {
    return doc?.slug?.current ? `${studioUrl}/destination/${doc?.slug?.current}` : `${studioUrl}`;
  }

  return doc?.slug?.current ? `${studioUrl}/tour/${doc?.slug?.current}` : `${studioUrl}`;
}

export const defaultDocumentNode: DefaultDocumentNodeResolver = (S, { schemaType }) => {
  switch (schemaType) {
    case 'page':
      return S.document().views([
        S.view.form(),
        S.view
          .component(Iframe)
          .options({
            url: (doc: SanityDocument) => generateIsDraftSearchParams(getPagePreviewUrl(doc)),
          })
          .title('Preview'),
      ]);
    case 'contentBlock':
      return S.document().views([
        S.view.form(),
        S.view
          .component(Iframe)
          .options({
            url: (doc: SanityDocument) => generateIsDraftSearchParams(getContentBlockPreviewUrl(doc)),
          })
          .title('Preview'),
      ]);
    case 'product':
      return S.document().views([
        S.view.form(),
        S.view
          .component(Iframe)
          .options({
            url: (doc: SanityDocument) => generateIsDraftSearchParams(getProductPreviewUrl(doc)),
          })
          .title('Preview'),
      ]);
    default:
      return S.document().views([S.view.form()]);
  }
};
