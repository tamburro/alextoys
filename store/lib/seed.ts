import type { Product } from "./types";

const p = (
  id: string,
  name: string,
  description: string,
  price: number,
  category: Product["category"],
  stock: number,
  featured = false,
): Product => ({
  id,
  name,
  description,
  price,
  category,
  image: `https://picsum.photos/seed/alextoys-${id}/640/640`,
  stock,
  featured,
  createdAt: Date.now() - Number(id.replace(/\D/g, "")) * 86400000,
});

export const SEED_PRODUCTS: Product[] = [
  p("robo-lata", "Robô de Lata Vintage", "Robô de lata com corda, réplica dos anos 60. Anda e solta faíscas no visor.", 18990, "classicos", 8, true),
  p("carrinho-ferro", "Carrinho de Ferro 1:24", "Miniatura em metal die-cast com portas que abrem e pintura metálica.", 8990, "classicos", 15, true),
  p("blocos-madeira", "Blocos de Madeira 100 pçs", "Blocos coloridos em madeira reflorestada, tinta atóxica.", 12990, "classicos", 20),
  p("piao-metal", "Pião de Metal com Corda", "O clássico pião de metal que canta ao girar. Corda inclusa.", 4990, "classicos", 30),
  p("robo-transformavel", "Robô Transformável X-9", "Vira carro, vira robô. Articulações em metal e luzes de LED.", 24990, "modernos", 12, true),
  p("blind-box-serie5", "Blind Box Série 5", "Caixa surpresa com 1 de 12 personagens colecionáveis. Qual você vai tirar?", 6990, "colecionaveis", 40, true),
  p("figura-heroi", "Action Figure Herói 25cm", "Figura articulada com 30 pontos de articulação e acessórios.", 19990, "colecionaveis", 10),
  p("kit-miniaturas", "Kit 6 Miniaturas de Corrida", "Seis carrinhos de corrida em escala 1:64 com pista de largada.", 15990, "colecionaveis", 18),
  p("urso-teddy", "Urso Teddy Clássico 40cm", "Pelúcia super macia com laço de cetim. O abraço que atravessa gerações.", 11990, "pelucias", 25, true),
  p("dino-pelucia", "Dino de Pelúcia Verde", "Dinossauro fofo de 35cm, olhos bordados, seguro para bebês.", 9990, "pelucias", 22),
  p("drone-mini", "Mini Drone Acrobático", "Drone de bolso com giros 360° e controle fácil pra iniciantes.", 29990, "modernos", 6),
  p("quebra-cabeca", "Quebra-Cabeça 1000 pçs", "Paisagem de loja de brinquedos em ilustração exclusiva.", 7990, "classicos", 14),
];
