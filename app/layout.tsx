import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Plano de Formação — Coimbra',
  description:
    'Aplicação offline para explorar o Plano de Formação do Serviço de Formação Profissional de Coimbra (ATUALIZAÇÃO: 18.12.2025)'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-PT">
      <body className="min-h-dvh text-iefp-ink">{children}</body>
    </html>
  );
}
