import { notFound } from "next/navigation";
import { getRepository } from "@/lib/github/client";
import { NotFoundError } from "@/lib/github/errors";
import { RepositoryDetail } from "@/features/repository-detail/components/repository-detail";
import { BackLink } from "@/features/repository-detail/components/back-link";

type Props = {
  params: Promise<{ owner: string; repo: string }>;
};

export default async function RepositoryDetailPage({ params }: Props) {
  const { owner, repo } = await params;

  let repository;
  try {
    repository = await getRepository(owner, repo);
  } catch (error) {
    if (error instanceof NotFoundError) notFound();
    throw error; // その他のエラーは error.tsx に委ねる
  }

  return (
    <main className="mx-auto max-w-[920px] px-6 pb-28">
      <div className="animate-float-in pt-7 pb-2">
        <BackLink />
      </div>
      <RepositoryDetail repository={repository} />
    </main>
  );
}
