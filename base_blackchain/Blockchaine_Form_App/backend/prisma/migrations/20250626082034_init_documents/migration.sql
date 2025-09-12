-- CreateTable
CREATE TABLE "Document" (
    "id" SERIAL NOT NULL,
    "filename" TEXT NOT NULL,
    "content" BYTEA NOT NULL,
    "sha256_hash" TEXT NOT NULL,
    "tx_hash" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Document_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Document_sha256_hash_key" ON "Document"("sha256_hash");
