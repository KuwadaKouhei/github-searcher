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
    throw error; // その他のエラーは error.tsx（タスク19）に委ねる
  }

  return (
    <main className="mx-auto max-w-3xl p-6">
      <BackLink />
      <RepositoryDetail repository={repository} />
    </main>
  );
}