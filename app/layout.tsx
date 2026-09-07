import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });
export const metadata: Metadata = { metadataBase: new URL('https://proofguard-emiliano-week4.ecarba27.chatgpt.site'), title: 'ProofGuard | Evidencia sin etiquetas', description: 'Revisa afirmaciones sobre evidencia de habilidades sin convertir una tarea en un juicio sobre la persona.', openGraph:{title:'ProofGuard',description:'La evidencia describe una tarea, no decide tu futuro.',images:['/proofguard-mockup.png']},twitter:{card:'summary_large_image',title:'ProofGuard',description:'La evidencia describe una tarea, no decide tu futuro.',images:['/proofguard-mockup.png']} };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="es"><body className={`${geistSans.variable} ${geistMono.variable}`}>{children}</body></html>; }
