'use client';
import Link from 'next/link';
import React from 'react';
import { PortableText } from 'next-sanity';
import { GetContentBlockBySlugResult } from '@/sanity/sanity.types';

interface NotFoundPage {
  block: GetContentBlockBySlugResult;
}

const TheNotFoundPage = ({ block }: NotFoundPage) => {
  const data = block?.listItems || [];
  const data1 = data[0]?.description;
  const data2 = data[1]?.description;
  const cta = data[2]?.description;

  const backgroundImage = block?.imageUrl;

  return (
    <div
      className="not-found-page"
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        width: '100%',
        objectFit: 'cover',
        position: 'relative',
      }}
    >
      <div
        style={{
          fontWeight: '800',
          fontSize: '280px',
          zIndex: 9999,
        }}
      >
        404
      </div>
      <span className="data-1">{data1 && <PortableText value={data1 || ''} />}</span>
      <span className="data-2">{data2 && <PortableText value={data2 || ''} />}</span>
      <Link
        href="/"
        style={{
          padding: '8px 12px',
          cursor: 'pointer',
          borderRadius: '6px',
        }}
        className="bg-blue-500 hover:bg-blue-400"
      >
        <span
          style={{
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
          }}
          className="cta"
        >
          {cta && <PortableText value={cta || ''} />}
        </span>
      </Link>
    </div>
  );
};

export default TheNotFoundPage;
