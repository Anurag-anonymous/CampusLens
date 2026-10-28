import type { Metadata } from 'next';
import { Github, Linkedin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About | CampusLens',
  description: 'Learn more about the creator of CampusLens.',
};

const profiles = [
  {
    href: 'https://github.com/Anurag-anonymous',
    label: 'GitHub',
    icon: Github,
  },
  {
    href: 'https://www.linkedin.com/in/anurag-pratap-singh-981290258/',
    label: 'LinkedIn',
    icon: Linkedin,
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <p className="mb-2 font-medium text-primary">About</p>
          <h1 className="text-3xl font-bold text-gray-900">Meet the creator</h1>
        </div>

        <section className="rounded-xl bg-white p-8 text-center shadow-md sm:p-12">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary text-2xl font-bold text-white">
            APS
          </div>
          <h2 className="text-2xl font-semibold text-gray-900">Anurag Pratap Singh</h2>
          <p className="mt-3 text-gray-600">
            Connect with me and explore my work through the links below.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {profiles.map(({ href, label, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 font-medium text-gray-700 transition hover:border-primary hover:text-primary"
              >
                <Icon className="h-5 w-5" />
                {label}
              </a>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
