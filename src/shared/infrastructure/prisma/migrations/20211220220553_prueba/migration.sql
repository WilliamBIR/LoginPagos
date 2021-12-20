/*
  Warnings:

  - You are about to drop the `Anexoclientes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Anexoclientes" DROP CONSTRAINT "Anexoclientes_operacion_id_fkey";

-- DropTable
DROP TABLE "Anexoclientes";

-- CreateTable
CREATE TABLE "Anexoclientespagos" (
    "anexo_pago_id" SERIAL NOT NULL,
    "fechadeconfirmacion" TEXT,
    "observacionesalconfirmar" TEXT,
    "operacion_id" TEXT NOT NULL,

    CONSTRAINT "Anexoclientespagos_pkey" PRIMARY KEY ("anexo_pago_id")
);

-- CreateTable
CREATE TABLE "Anexoclientesfondos" (
    "anexo_clientes_id" SERIAL NOT NULL,
    "observaciones" TEXT,
    "cuentabancaria" TEXT,
    "fechadeingreso" TEXT,
    "operacion_id" TEXT NOT NULL,

    CONSTRAINT "Anexoclientesfondos_pkey" PRIMARY KEY ("anexo_clientes_id")
);

-- AddForeignKey
ALTER TABLE "Anexoclientespagos" ADD CONSTRAINT "Anexoclientespagos_operacion_id_fkey" FOREIGN KEY ("operacion_id") REFERENCES "Clientes"("operacion_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Anexoclientesfondos" ADD CONSTRAINT "Anexoclientesfondos_operacion_id_fkey" FOREIGN KEY ("operacion_id") REFERENCES "Clientes"("operacion_id") ON DELETE CASCADE ON UPDATE CASCADE;
