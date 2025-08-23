// src/pages/Home.jsx
import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Home() {
  const { user } = useAuth();

  return (
    <section className="home-hero">
      <div className="home-hero__card">
        <div className="home-hero__badge">🍕 FoodStore</div>

        <h1 className="home-hero__title">
          Welcome to <span>FoodStore</span>
        </h1>

        <p className="home-hero__subtitle">
          Fresh. Fast. Tasty. Explore our products and add your favourites.
        </p>

        <div className="home-hero__actions">
          <Button as={Link} to="/products" className="btn-cta">
            Explore products
          </Button>

          {!user ? (
            <>
              <Button as={Link} to="/login" className="btn-ghost">
                Login
              </Button>
              <Button as={Link} to="/register" className="btn-soft">
                Register
              </Button>
            </>
          ) : (
            <>
              <Button as={Link} to="/favourites" className="btn-ghost">
                My favourites
              </Button>
              <Button as={Link} to="/cart" className="btn-soft">
                Cart
              </Button>
            </>
          )}
        </div>
      </div>

      {/* ===== Styles for Home (scoped to this page) ===== */}
      <style>{`
        .home-hero{
          padding: 110px 16px 64px;                 /* tránh đè navbar fixed */
          background:
            radial-gradient(1200px 420px at 50% -140px, rgba(76,175,80,.14), transparent 58%),
            var(--bg);
          min-height: calc(100vh - 110px);
        }

        .home-hero__card{
          max-width: 980px;
          margin: 0 auto;
          padding: 48px 28px;
          text-align: center;
          border-radius: 24px;
          background: linear-gradient(180deg, rgba(255,255,255,.72), rgba(255,255,255,.62));
          border: 1px solid var(--border);
          box-shadow: 0 20px 60px rgba(0,0,0,.12);
          backdrop-filter: blur(6px);
        }
        :root[data-theme="dark"] .home-hero__card{
          background: linear-gradient(180deg, rgba(22,26,30,.7), rgba(22,26,30,.55));
          box-shadow: 0 24px 60px rgba(0,0,0,.35);
        }

        .home-hero__badge{
          display: inline-block;
          font-weight: 900;
          letter-spacing: .3px;
          color: var(--primary);
          background: rgba(46,125,50,.12);
          border: 1px solid rgba(46,125,50,.25);
          padding: 6px 12px;
          border-radius: 999px;
          margin-bottom: 14px;
        }

        .home-hero__title{
          font-size: clamp(28px, 4.8vw, 44px);
          font-weight: 900;
          margin: 4px 0 10px;
          letter-spacing: .2px;
          line-height: 1.18;
        }
        .home-hero__title span{
          background: linear-gradient(135deg, #2e7d32, #66bb6a);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .home-hero__subtitle{
          max-width: 720px;
          margin: 0 auto 22px;
          color: var(--muted);
          font-size: clamp(14px, 1.8vw, 16px);
        }

        .home-hero__actions{
          display: inline-flex;
          gap: 12px;
          flex-wrap: wrap;
          justify-content: center;
        }

        /* CTA xanh lá */
        .btn-cta{
          background: var(--primary);
          color: #fff;
          border: none;
          padding: 12px 20px;
          border-radius: 14px;
          font-weight: 800;
          letter-spacing: .2px;
          box-shadow: 0 10px 22px rgba(46,125,50,.25);
          transition: transform .15s ease, filter .15s ease;
        }
        .btn-cta:hover{ filter: brightness(.95); transform: translateY(-1px); }

        /* Ghost: viền nhẹ */
        .btn-ghost{
          background: transparent;
          color: var(--text);
          border: 1.6px solid var(--border);
          padding: 11px 18px;
          border-radius: 14px;
          font-weight: 800;
        }
        .btn-ghost:hover{ background: rgba(0,0,0,.04); }

        /* Soft: nền thẻ theo theme */
        .btn-soft{
          background: var(--card);
          color: var(--text);
          border: 1.6px solid var(--border);
          padding: 11px 18px;
          border-radius: 14px;
          font-weight: 800;
          box-shadow: 0 6px 16px rgba(0,0,0,.08);
        }
        .btn-soft:hover{ filter: brightness(.98); }

        /* responsive nhỏ hơn */
        @media (max-width: 576px){
          .home-hero__card{ padding: 36px 18px; }
          .home-hero__actions{ gap: 10px; }
        }
      `}</style>
    </section>
  );
}
