#!/usr/bin/env python3
from __future__ import annotations

import json
import math
import os
from pathlib import Path
from textwrap import fill

BASE_DIR = Path(__file__).resolve().parent
MPLCONFIGDIR = BASE_DIR / ".mplconfig"
MPLCONFIGDIR.mkdir(exist_ok=True)
CACHE_DIR = BASE_DIR / ".cache"
(CACHE_DIR / "fontconfig").mkdir(parents=True, exist_ok=True)
os.environ.setdefault("MPLCONFIGDIR", str(MPLCONFIGDIR))
os.environ.setdefault("XDG_CACHE_HOME", str(CACHE_DIR))

import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
import matplotlib.patheffects as pe
import matplotlib.ticker as mticker
import numpy as np
import pandas as pd
from matplotlib.lines import Line2D
from matplotlib.patches import FancyBboxPatch, Rectangle


OUTPUT_DIR = BASE_DIR / "presentation_assets"
CHART_DIR = OUTPUT_DIR / "charts"
TABLE_DIR = OUTPUT_DIR / "tables"
DATA_DIR = OUTPUT_DIR / "source_data"

NAVY = "#1B3A6B"
TEAL = "#048A81"
GREEN = "#27AE60"
RED = "#C0392B"
ORANGE = "#E67E22"
GRAY = "#6B7280"
MUTED = "#9CA3AF"
MGRAY = "#D1D5DB"
LGRAY = "#F3F4F6"
WHITE = "#FFFFFF"
BASE_POINT = "#AAB8CC"

plt.rcParams.update(
    {
        "font.family": ["DejaVu Sans"],
        "figure.facecolor": WHITE,
        "axes.facecolor": WHITE,
        "axes.edgecolor": MGRAY,
        "axes.labelcolor": GRAY,
        "axes.titlesize": 16,
        "axes.titleweight": "bold",
        "axes.grid": False,
        "xtick.color": GRAY,
        "ytick.color": GRAY,
        "svg.fonttype": "none",
        "savefig.facecolor": WHITE,
        "savefig.edgecolor": WHITE,
    }
)


def ensure_dirs() -> None:
    for directory in [OUTPUT_DIR, CHART_DIR, TABLE_DIR, DATA_DIR]:
        directory.mkdir(parents=True, exist_ok=True)


def fmt_number(value: float, digits: int = 0) -> str:
    if value is None or pd.isna(value):
        return "n/a"
    if digits == 0:
        return f"{int(round(float(value))):,}".replace(",", ".")
    return f"{float(value):,.{digits}f}".replace(",", "X").replace(".", ",").replace("X", ".")


def fmt_pct(value: float | None, digits: int = 1, signed: bool = True) -> str:
    if value is None or pd.isna(value):
        return "n/a"
    prefix = "+" if signed and value >= 0 else ""
    return f"{prefix}{value * 100:.{digits}f}%".replace(".", ",")


def fmt_brl(value: float, digits: int = 0) -> str:
    if digits == 0:
        body = f"{abs(value):,.0f}".replace(",", "X").replace(".", ",").replace("X", ".")
    else:
        body = f"{abs(value):,.{digits}f}".replace(",", "X").replace(".", ",").replace("X", ".")
    return f"R$ {body}" if value >= 0 else f"-R$ {body}"


def fmt_brl_short(value: float) -> str:
    sign = "-" if value < 0 else ""
    abs_value = abs(value)
    if abs_value >= 1_000_000:
        body = f"{abs_value / 1_000_000:.1f}".replace(".", ",")
        return f"{sign}R$ {body}M"
    if abs_value >= 1_000:
        body = f"{abs_value / 1_000:.0f}".replace(".", ",")
        return f"{sign}R$ {body}K"
    body = f"{abs_value:.0f}".replace(".", ",")
    return f"{sign}R$ {body}"


def wrap(text: str, width: int) -> str:
    return fill(str(text), width=width, break_long_words=False)


def export_source(df: pd.DataFrame, name: str) -> Path:
    path = DATA_DIR / f"{name}.csv"
    df.to_csv(path, index=False)
    return path


def save_figure(fig: plt.Figure, folder: Path, name: str) -> tuple[Path, Path]:
    svg_path = folder / f"{name}.svg"
    png_path = folder / f"{name}.png"
    fig.savefig(svg_path, bbox_inches="tight", pad_inches=0.08)
    fig.savefig(png_path, dpi=240, bbox_inches="tight", pad_inches=0.08)
    plt.close(fig)
    return svg_path, png_path


def style_chart(ax: plt.Axes) -> None:
    ax.spines["top"].set_visible(False)
    ax.spines["right"].set_visible(False)
    ax.spines["left"].set_color(MGRAY)
    ax.spines["bottom"].set_color(MGRAY)
    ax.tick_params(length=0)
    ax.grid(axis="x", color=MGRAY, linewidth=0.8, linestyle="--", alpha=0.5)
    ax.set_axisbelow(True)


def draw_title(ax: plt.Axes, title: str, subtitle: str) -> None:
    ax.text(0.0, 1.10, title, transform=ax.transAxes, fontsize=16, fontweight="bold", color=NAVY, ha="left")
    ax.text(0.0, 1.04, subtitle, transform=ax.transAxes, fontsize=9.5, color=GRAY, ha="left")


def render_methodology_table() -> dict:
    rows = [
        ["Cliente", "Rede (DS_REDE)", "analise acima da loja individual"],
        ["Loja", "NM_REDUZIDO", "menor granularidade disponivel"],
        ["Preco medio", "Receita / Quantidade", "evita vies da media simples"],
        ["Crescimento %", "So redes comparaveis (2024 > 0)", "exclui distorcao de base zero"],
        ["Crescimento R$", "Todas as redes com receita em 2025", "mede impacto financeiro real"],
        ["Dimensao (E3)", "Categoria", "join 100% confiavel"],
        ["Macro-regiao", "Descartada", "sem coluna de municipio para join"],
    ]
    df = pd.DataFrame(rows, columns=["Decisao", "Criterio adotado", "Justificativa"])
    export_source(df, "s02_methodology_table")

    fig = plt.figure(figsize=(12.5, 4.7))
    ax = fig.add_axes([0, 0, 1, 1])
    ax.set_xlim(0, 1)
    ax.set_ylim(0, 1)
    ax.axis("off")

    ax.add_patch(
        FancyBboxPatch((0.00, 0.00), 1.0, 1.0, boxstyle="round,pad=0.012,rounding_size=0.025",
                       facecolor=WHITE, edgecolor=MGRAY, linewidth=1.2)
    )
    ax.text(0.04, 0.93, "Decisoes metodologicas", fontsize=16, fontweight="bold", color=NAVY, va="center")
    ax.text(0.04, 0.88, "Tabela pronta para o slide 2, com destaque visual nas escolhas criticas.", fontsize=9.5, color=GRAY, va="center")

    left = 0.04
    width = 0.92
    top = 0.80
    header_h = 0.085
    row_h = 0.095
    col_widths = [0.22, 0.31, 0.47]
    x_positions = np.cumsum([left, *(width * np.array(col_widths[:-1]))])

    ax.add_patch(Rectangle((left, top), width, header_h, facecolor=NAVY, edgecolor=NAVY))
    headers = ["Decisao", "Criterio adotado", "Justificativa"]
    for idx, header in enumerate(headers):
        x = x_positions[idx] + 0.012
        color = WHITE if idx < 2 else TEAL
        ax.text(x, top + header_h / 2, header, color=color, fontsize=10, fontweight="bold", va="center")

    for row_idx, row in enumerate(rows):
        y = top - (row_idx + 1) * row_h
        bg = LGRAY if row_idx % 2 == 0 else WHITE
        ax.add_patch(Rectangle((left, y), width, row_h, facecolor=bg, edgecolor=MGRAY, linewidth=0.5))

        dec, crit, just = row
        crit_color = RED if crit == "Descartada" else TEAL
        ax.text(left + 0.012, y + row_h / 2, wrap(dec, 18), color=NAVY, fontsize=10, fontweight="bold", va="center")
        ax.text(x_positions[1] + 0.012, y + row_h / 2, wrap(crit, 28), color=crit_color, fontsize=9.7, fontweight="bold", va="center")
        ax.text(x_positions[2] + 0.012, y + row_h / 2, wrap(just, 34), color=GRAY, fontsize=9.2, va="center")

    svg_path, png_path = save_figure(fig, TABLE_DIR, "s02_methodology_table")
    return {
        "name": "slide 2 metodologia",
        "svg": svg_path,
        "png": png_path,
        "csv": DATA_DIR / "s02_methodology_table.csv",
        "usage": "Tabela principal do slide 2.",
    }


def render_quality_snapshot(metrics: dict) -> dict:
    quality = pd.DataFrame(
        [
            ["Join lojas", f"{metrics['store_join_coverage_pct']:.4f}%".replace(".", ","), "em ambos os anos"],
            ["Join produtos", f"{metrics['product_join_coverage_pct']:.4f}%".replace(".", ","), "1 codigo sem cadastro"],
            ["Periodo 2024", "jan/24 -> dez/24", "ano fechado"],
            ["Periodo 2025", "jan/25 -> dez/25", "ano fechado"],
            ["Transacoes analisadas", fmt_number(metrics["fact_rows"]), "volume base do estudo"],
        ],
        columns=["Indicador", "Valor", "Observacao"],
    )
    export_source(quality, "s02_quality_snapshot")
    return {
        "name": "slide 2 qualidade",
        "csv": DATA_DIR / "s02_quality_snapshot.csv",
        "usage": "Dados-base para os cards de qualidade do slide 2.",
    }


def render_pareto_chart(pareto: pd.DataFrame, overall: dict) -> dict:
    top10 = pareto.head(10).copy()
    rest = pareto.iloc[10:].copy()
    plot_df = top10[["network", "sales_2025", "share", "cum_share"]].copy()
    if not rest.empty:
        plot_df = pd.concat(
            [
                plot_df,
                pd.DataFrame(
                    [
                        {
                            "network": "Demais redes",
                            "sales_2025": rest["sales_2025"].sum(),
                            "share": rest["share"].sum(),
                            "cum_share": 1.0,
                        }
                    ]
                ),
            ],
            ignore_index=True,
        )
    plot_df["is_class_a"] = plot_df["network"] != "Demais redes"
    export_source(plot_df, "s03_pareto_chart")

    fig, ax = plt.subplots(figsize=(11.8, 6.3))
    y = np.arange(len(plot_df))
    colors = [NAVY if value else MGRAY for value in plot_df["is_class_a"]]
    bars = ax.barh(y, plot_df["sales_2025"], color=colors, height=0.62)
    ax.invert_yaxis()
    ax.set_yticks(y)
    ax.set_yticklabels(plot_df["network"], fontsize=10)
    ax.xaxis.set_major_formatter(mticker.FuncFormatter(lambda value, _: fmt_brl_short(value)))
    ax.set_xlabel("Receita 2025", fontsize=10)
    style_chart(ax)
    draw_title(ax, "Curva ABC / Pareto", "Top 10 redes em navy e consolidado do restante em cinza.")

    ax2 = ax.twiny()
    ax2.plot(plot_df["cum_share"] * 100, y, color=RED, marker="o", linewidth=2.2, markersize=5)
    ax2.axvline(80, color=RED, linestyle="--", linewidth=1.2, alpha=0.9)
    ax2.set_xlim(0, 100)
    ax2.set_xlabel("% acumulado", fontsize=10, color=RED)
    ax2.tick_params(axis="x", colors=RED, length=0)
    ax2.spines["top"].set_color(MGRAY)
    ax2.spines["left"].set_visible(False)
    ax2.spines["right"].set_visible(False)
    ax2.grid(False)

    for bar, revenue in zip(bars, plot_df["sales_2025"]):
        ax.text(
            revenue + plot_df["sales_2025"].max() * 0.012,
            bar.get_y() + bar.get_height() / 2,
            fmt_brl_short(revenue),
            va="center",
            ha="left",
            fontsize=9,
            color=GRAY,
        )

    badge = FancyBboxPatch(
        (0.66, 0.05),
        0.30,
        0.14,
        transform=ax.transAxes,
        boxstyle="round,pad=0.012,rounding_size=0.02",
        facecolor=LGRAY,
        edgecolor=MGRAY,
        linewidth=1,
    )
    ax.add_patch(badge)
    ax.text(0.685, 0.135, "Classe A", transform=ax.transAxes, fontsize=9, fontweight="bold", color=NAVY)
    ax.text(0.685, 0.083, "10 redes = 81,2% da receita", transform=ax.transAxes, fontsize=10.5, fontweight="bold", color=NAVY)
    ax.text(0.685, 0.040, f"Receita total 2025: {fmt_brl(overall['2025']['revenue'])}", transform=ax.transAxes, fontsize=8.5, color=GRAY)

    legend_items = [
        Rectangle((0, 0), 1, 1, facecolor=NAVY, edgecolor=NAVY, label="Classe A (<= 80%)"),
        Rectangle((0, 0), 1, 1, facecolor=MGRAY, edgecolor=MGRAY, label="Demais redes"),
        Line2D([0], [0], color=RED, marker="o", linewidth=2, label="% acumulado"),
    ]
    ax.legend(handles=legend_items, loc="lower right", frameon=False, fontsize=9)

    svg_path, png_path = save_figure(fig, CHART_DIR, "s03_pareto_chart")
    return {
        "name": "slide 3 pareto",
        "svg": svg_path,
        "png": png_path,
        "csv": DATA_DIR / "s03_pareto_chart.csv",
        "usage": "Grafico principal do slide 3.",
    }


def render_price_growth_scatter(network: pd.DataFrame, corr: float) -> dict:
    comparable = network[(network["sales_2024"] > 0) & (network["sales_2025"] > 0)].copy()
    comparable = comparable.dropna(subset=["price_2025", "growth_pct"])
    plot_df = comparable[["network", "price_2025", "growth_pct", "sales_2025"]].copy()
    export_source(plot_df, "s05_price_vs_growth")

    fig, ax = plt.subplots(figsize=(11.8, 6.5))
    style_chart(ax)
    draw_title(ax, "Preco medio x crescimento", "Cada ponto representa uma rede comparavel com venda em 2024 e 2025.")

    ax.scatter(
        comparable["price_2025"],
        comparable["growth_pct"] * 100,
        s=48,
        color=BASE_POINT,
        alpha=0.42,
        edgecolors="none",
    )

    highlights = {
        "DB": TEAL,
        "M.QUALIDADE": GREEN,
        "GPA": NAVY,
        "OBA": NAVY,
        "ST MARCHE": ORANGE,
        "PAGUE MENOS": RED,
    }
    offsets = {
        "DB": (8, 10),
        "M.QUALIDADE": (8, -12),
        "GPA": (8, -10),
        "OBA": (8, 10),
        "ST MARCHE": (8, 10),
        "PAGUE MENOS": (8, -10),
    }

    for network_name, color in highlights.items():
        row = comparable.loc[comparable["network"] == network_name]
        if row.empty:
            continue
        record = row.iloc[0]
        ax.scatter(
            [record["price_2025"]],
            [record["growth_pct"] * 100],
            s=78,
            color=color,
            alpha=0.95,
            edgecolors=WHITE,
            linewidth=0.8,
            zorder=4,
        )
        dx, dy = offsets.get(network_name, (8, 8))
        annotation = ax.annotate(
            network_name,
            (record["price_2025"], record["growth_pct"] * 100),
            xytext=(dx, dy),
            textcoords="offset points",
            fontsize=9,
            color=color,
            fontweight="bold",
            zorder=5,
        )
        annotation.set_path_effects([pe.withStroke(linewidth=3, foreground=WHITE)])

    ax.axhline(0, color=MUTED, linestyle="--", linewidth=1.2)
    ax.set_xlabel("Preco medio 2025 (R$)", fontsize=10)
    ax.set_ylabel("Crescimento de receita (%)", fontsize=10)
    ax.yaxis.set_major_formatter(mticker.PercentFormatter())
    ax.set_xlim(max(0, comparable["price_2025"].min() - 0.2), comparable["price_2025"].max() + 0.25)
    ymin = min(-100, math.floor(comparable["growth_pct"].min() * 100 / 50) * 50)
    ymax = math.ceil(comparable["growth_pct"].max() * 100 / 100) * 100
    ax.set_ylim(ymin, ymax + 60)

    badge = FancyBboxPatch(
        (0.03, 0.85),
        0.27,
        0.11,
        transform=ax.transAxes,
        boxstyle="round,pad=0.012,rounding_size=0.02",
        facecolor=WHITE,
        edgecolor=RED,
        linewidth=1.2,
    )
    ax.add_patch(badge)
    ax.text(0.055, 0.914, f"Correlacao de Pearson: {corr:.3f}".replace(".", ","), transform=ax.transAxes, fontsize=10, fontweight="bold", color=RED, va="center")
    ax.text(0.055, 0.872, "Relacao praticamente nula entre preco e crescimento.", transform=ax.transAxes, fontsize=8.7, color=GRAY, va="center")

    svg_path, png_path = save_figure(fig, CHART_DIR, "s05_price_vs_growth")
    return {
        "name": "slide 5 scatter",
        "svg": svg_path,
        "png": png_path,
        "csv": DATA_DIR / "s05_price_vs_growth.csv",
        "usage": "Grafico principal do slide 5.",
    }


def render_category_revenue_chart(category: pd.DataFrame) -> dict:
    chart_df = category.sort_values("sales_2025", ascending=True).copy()
    export_source(chart_df[["category", "sales_2024", "sales_2025"]], "s06_category_revenue")

    fig, ax = plt.subplots(figsize=(7.4, 5.3))
    y = np.arange(len(chart_df))
    h = 0.34
    ax.barh(y - h / 2, chart_df["sales_2024"], height=h, color=MGRAY, label="2024")
    ax.barh(y + h / 2, chart_df["sales_2025"], height=h, color=NAVY, label="2025")
    ax.set_yticks(y)
    ax.set_yticklabels(chart_df["category"], fontsize=9.5)
    ax.xaxis.set_major_formatter(mticker.FuncFormatter(lambda value, _: fmt_brl_short(value)))
    ax.set_xlabel("Receita por categoria", fontsize=9.5)
    ax.legend(frameon=False, loc="lower right", fontsize=8.5)
    style_chart(ax)
    draw_title(ax, "Receita por categoria", "Barras agrupadas para 2024 e 2025.")

    for value, ypos in zip(chart_df["sales_2025"], y + h / 2):
        ax.text(value + chart_df["sales_2025"].max() * 0.015, ypos, fmt_brl_short(value), va="center", fontsize=8.2, color=GRAY)

    svg_path, png_path = save_figure(fig, CHART_DIR, "s06_category_revenue")
    return {
        "name": "slide 6 receita categoria",
        "svg": svg_path,
        "png": png_path,
        "csv": DATA_DIR / "s06_category_revenue.csv",
        "usage": "Grafico 1 do slide 6.",
    }


def render_category_growth_chart(category: pd.DataFrame) -> dict:
    chart_df = category.sort_values("growth_pct", ascending=True).copy()
    export_source(chart_df[["category", "growth_abs", "growth_pct"]], "s06_category_growth")

    fig, ax = plt.subplots(figsize=(7.2, 5.3))
    y = np.arange(len(chart_df))
    ax.barh(y, chart_df["growth_pct"] * 100, color=GREEN, alpha=0.92)
    ax.set_yticks(y)
    ax.set_yticklabels(chart_df["category"], fontsize=9.5)
    ax.xaxis.set_major_formatter(mticker.PercentFormatter())
    ax.set_xlabel("Variacao YoY de receita", fontsize=9.5)
    style_chart(ax)
    draw_title(ax, "Variacao de receita YoY", "Categorias ordenadas do menor para o maior crescimento.")

    for value, ypos in zip(chart_df["growth_pct"], y):
        ax.text(value * 100 + 2.5, ypos, fmt_pct(value), va="center", fontsize=8.4, color=GRAY)

    svg_path, png_path = save_figure(fig, CHART_DIR, "s06_category_growth")
    return {
        "name": "slide 6 crescimento categoria",
        "svg": svg_path,
        "png": png_path,
        "csv": DATA_DIR / "s06_category_growth.csv",
        "usage": "Grafico 2 do slide 6.",
    }


def render_category_price_chart(category: pd.DataFrame) -> dict:
    chart_df = category.sort_values("price_growth_pct", ascending=True).copy()
    export_source(chart_df[["category", "price_2024", "price_2025", "price_growth_pct"]], "s06_category_price")

    fig, ax = plt.subplots(figsize=(7.2, 5.3))
    y = np.arange(len(chart_df))
    colors = [GREEN if value >= 0 else RED for value in chart_df["price_growth_pct"]]
    ax.barh(y, chart_df["price_growth_pct"] * 100, color=colors, alpha=0.92)
    ax.axvline(0, color=MUTED, linestyle="-", linewidth=1)
    ax.set_yticks(y)
    ax.set_yticklabels(chart_df["category"], fontsize=9.5)
    ax.xaxis.set_major_formatter(mticker.PercentFormatter())
    ax.set_xlabel("Variacao YoY de preco medio", fontsize=9.5)
    style_chart(ax)
    draw_title(ax, "Variacao de preco medio", "Verde indica ganho de preco; vermelho indica erosao.")

    for value, ypos in zip(chart_df["price_growth_pct"], y):
        x = value * 100 + (1.8 if value >= 0 else -1.8)
        ax.text(x, ypos, fmt_pct(value), va="center", ha="left" if value >= 0 else "right", fontsize=8.4, color=GRAY)

    svg_path, png_path = save_figure(fig, CHART_DIR, "s06_category_price")
    return {
        "name": "slide 6 preco categoria",
        "svg": svg_path,
        "png": png_path,
        "csv": DATA_DIR / "s06_category_price.csv",
        "usage": "Grafico 3 do slide 6.",
    }


def render_drivers_chart(network: pd.DataFrame) -> dict:
    comparable = network[network["sales_2024"] > 0].copy()
    drivers = comparable.sort_values("growth_abs", ascending=False).head(5)
    detractors = comparable.sort_values("growth_abs", ascending=True).head(4)
    chart_df = pd.concat([detractors, drivers], ignore_index=True)
    export_source(chart_df[["network", "growth_abs", "growth_pct"]], "s08_drivers_diverging")

    fig, ax = plt.subplots(figsize=(11.5, 6.4))
    y = np.arange(len(chart_df))
    colors = [RED if value < 0 else GREEN for value in chart_df["growth_abs"]]
    bars = ax.barh(y, chart_df["growth_abs"], color=colors, alpha=0.92, height=0.62)
    ax.set_yticks(y)
    ax.set_yticklabels(chart_df["network"], fontsize=10)
    ax.axvline(0, color=MUTED, linewidth=1.2)
    ax.xaxis.set_major_formatter(mticker.FuncFormatter(lambda value, _: fmt_brl_short(value)))
    ax.set_xlabel("Delta de receita (2025 vs 2024)", fontsize=10)
    style_chart(ax)
    draw_title(ax, "Impulsionadores e detratores", "Top 5 positivos e top 4 negativos por variacao absoluta de receita.")

    max_abs = chart_df["growth_abs"].abs().max()
    ax.set_xlim(-max_abs * 1.32, max_abs * 1.32)
    for bar, value, pct in zip(bars, chart_df["growth_abs"], chart_df["growth_pct"]):
        xpos = value + (max_abs * 0.04 if value >= 0 else -max_abs * 0.04)
        ax.text(
            xpos,
            bar.get_y() + bar.get_height() / 2,
            f"{fmt_brl_short(value)} | {fmt_pct(pct)}",
            va="center",
            ha="left" if value >= 0 else "right",
            fontsize=8.6,
            color=GRAY,
        )

    svg_path, png_path = save_figure(fig, CHART_DIR, "s08_drivers_diverging")
    return {
        "name": "slide 8 drivers",
        "svg": svg_path,
        "png": png_path,
        "csv": DATA_DIR / "s08_drivers_diverging.csv",
        "usage": "Grafico principal do slide 8.",
    }


def render_category_impact_table(category: pd.DataFrame) -> dict:
    table_df = category.sort_values("growth_abs", ascending=False).copy()
    export_source(table_df[["category", "growth_abs", "growth_pct"]], "s08_category_impact_table")

    fig = plt.figure(figsize=(7.1, 4.6))
    ax = fig.add_axes([0, 0, 1, 1])
    ax.set_xlim(0, 1)
    ax.set_ylim(0, 1)
    ax.axis("off")

    ax.add_patch(
        FancyBboxPatch((0.00, 0.00), 1.0, 1.0, boxstyle="round,pad=0.012,rounding_size=0.025",
                       facecolor=WHITE, edgecolor=MGRAY, linewidth=1.2)
    )
    ax.text(0.05, 0.92, "Impacto por categoria", fontsize=15, fontweight="bold", color=NAVY, va="center")
    ax.text(0.05, 0.87, "Tabela pronta para a coluna direita do slide 8.", fontsize=9.3, color=GRAY, va="center")

    left = 0.05
    width = 0.90
    top = 0.76
    header_h = 0.09
    row_h = 0.085
    col_x = [left, left + width * 0.45, left + width * 0.76]

    ax.add_patch(Rectangle((left, top), width, header_h, facecolor=NAVY, edgecolor=NAVY))
    ax.text(col_x[0] + 0.012, top + header_h / 2, "Categoria", color=WHITE, fontsize=10, fontweight="bold", va="center")
    ax.text(col_x[1] + 0.012, top + header_h / 2, "Delta receita", color=WHITE, fontsize=10, fontweight="bold", va="center")
    ax.text(col_x[2] + 0.012, top + header_h / 2, "Var%", color=TEAL, fontsize=10, fontweight="bold", va="center")

    for idx, row in enumerate(table_df.itertuples(index=False)):
        y = top - (idx + 1) * row_h
        bg = LGRAY if idx % 2 == 0 else WHITE
        ax.add_patch(Rectangle((left, y), width, row_h, facecolor=bg, edgecolor=MGRAY, linewidth=0.5))
        value_color = GREEN if row.growth_abs >= 0 else RED
        ax.text(col_x[0] + 0.012, y + row_h / 2, str(row.category), color=NAVY, fontsize=10, fontweight="bold", va="center")
        ax.text(col_x[1] + 0.012, y + row_h / 2, fmt_brl_short(row.growth_abs), color=value_color, fontsize=9.6, fontweight="bold", va="center")
        ax.text(col_x[2] + 0.012, y + row_h / 2, fmt_pct(row.growth_pct), color=value_color, fontsize=9.6, fontweight="bold", va="center")

    svg_path, png_path = save_figure(fig, TABLE_DIR, "s08_category_impact_table")
    return {
        "name": "slide 8 impacto por categoria",
        "svg": svg_path,
        "png": png_path,
        "csv": DATA_DIR / "s08_category_impact_table.csv",
        "usage": "Tabela da coluna direita do slide 8.",
    }


def build_manifest(assets: list[dict]) -> None:
    manifest = []
    lines = [
        "# Presentation Assets",
        "",
        "Assets gerados a partir de `analysis_output/*.csv` e `analysis_case_metrics.json`.",
        "",
        "## Estrategia de formato",
        "",
        "- `SVG` para graficos e tabelas visuais, preservando nitidez ao redimensionar no PowerPoint ou Canva.",
        "- `PNG` em alta resolucao como fallback universal para qualquer ferramenta.",
        "- `CSV` com os dados-fonte de cada visual para ajustes manuais.",
        "",
        "## Arquivos",
        "",
    ]

    for asset in assets:
        item = {
            "name": asset["name"],
            "usage": asset["usage"],
            "files": {},
        }
        lines.append(f"- `{asset['name']}`: {asset['usage']}")
        for key in ["svg", "png", "csv"]:
            path = asset.get(key)
            if path:
                rel_path = path.relative_to(BASE_DIR)
                item["files"][key] = str(rel_path)
                lines.append(f"  {key.upper()}: `{rel_path}`")
        manifest.append(item)

    (OUTPUT_DIR / "README.md").write_text("\n".join(lines) + "\n", encoding="utf-8")
    (OUTPUT_DIR / "manifest.json").write_text(json.dumps(manifest, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")


def load_inputs() -> tuple[pd.DataFrame, pd.DataFrame, pd.DataFrame, dict]:
    network = pd.read_csv(BASE_DIR / "analysis_output" / "network_metrics.csv")
    category = pd.read_csv(BASE_DIR / "analysis_output" / "category_metrics.csv")
    overall = pd.read_csv(BASE_DIR / "analysis_output" / "overall_metrics.csv")
    pareto = pd.read_csv(BASE_DIR / "analysis_output" / "pareto_network_2025.csv")
    metrics = json.loads((BASE_DIR / "analysis_case_metrics.json").read_text(encoding="utf-8"))

    category["price_growth_pct"] = (category["price_2025"] / category["price_2024"]) - 1
    return network, category, overall, {"pareto": pareto, "metrics": metrics}


def main() -> None:
    ensure_dirs()
    network, category, _, extra = load_inputs()
    metrics = extra["metrics"]
    pareto = extra["pareto"]

    assets = [
        render_methodology_table(),
        render_quality_snapshot(metrics["quality"]),
        render_pareto_chart(pareto, metrics["overall"]),
        render_price_growth_scatter(network, metrics["price_growth_relationship"]["correlation_pearson"]),
        render_category_revenue_chart(category),
        render_category_growth_chart(category),
        render_category_price_chart(category),
        render_drivers_chart(network),
        render_category_impact_table(category),
    ]
    build_manifest(assets)

    print("Assets gerados em:")
    print(f"  {OUTPUT_DIR}")
    for asset in assets:
        for key in ["svg", "png", "csv"]:
            path = asset.get(key)
            if path:
                print(f"  - {path.relative_to(BASE_DIR)}")


if __name__ == "__main__":
    main()
