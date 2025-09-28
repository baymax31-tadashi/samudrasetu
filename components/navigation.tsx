"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useAuth } from "@/components/auth-provider"
import { canAccessDashboard } from "@/lib/auth"
const MenuIcon = () => (
  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
)
import Link from "next/link"
import Image from "next/image"
import { LanguageSwitcher } from "./language-switcher"
import { ThemeToggle } from "@/components/theme-toggle"
import { useTranslation } from "@/lib/translations"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const { t } = useTranslation()
  const { user } = useAuth()

  return (
    <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo Section - Fixed width to prevent overlap */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <Image
              src="/images/samudrasetu-logo.png"
              alt="SAMUDRASETU Logo"
              width={40}
              height={40}
              className="rounded-full"
            />
            <div className="hidden sm:flex flex-col">
              <div className="text-lg font-bold text-primary leading-tight">SAMUDRASETU</div>
              <p className="text-xs text-muted-foreground leading-tight">Coastal Safety Bridge</p>
            </div>
            {/* Mobile-only compact logo text */}
            <div className="sm:hidden">
              <div className="text-base font-bold text-primary">SAMUDRASETU</div>
            </div>
          </Link>

          {/* Desktop Navigation - Better spacing and overflow handling */}
          <nav className="hidden lg:flex items-center gap-4 xl:gap-6">
            <Link
              href="/report"
              className="text-sm text-foreground hover:text-primary transition-colors whitespace-nowrap"
            >
              {t("reportHazard")}
            </Link>
            <Link
              href="/dashboard"
              className="text-sm text-foreground hover:text-primary transition-colors whitespace-nowrap"
            >
              {t("dashboard")}
            </Link>
            <Link
              href="/safe-locations"
              className="text-sm text-foreground hover:text-primary transition-colors whitespace-nowrap"
            >
              {t("safeLocations")}
            </Link>
            <Link
              href="/media"
              className="text-sm text-foreground hover:text-primary transition-colors whitespace-nowrap"
            >
              {t("mediaGallery")}
            </Link>
            <Link
              href="/analytics"
              className="text-sm text-foreground hover:text-primary transition-colors whitespace-nowrap"
            >
              {t("analytics")}
            </Link>
            <Link
              href="/community"
              className="text-sm text-foreground hover:text-primary transition-colors whitespace-nowrap"
            >
              {t("community")}
            </Link>
            {canAccessDashboard(user) && (
              <Link
                href="/admin"
                className="text-sm text-foreground hover:text-primary transition-colors whitespace-nowrap"
              >
                {t("admin")}
              </Link>
            )}
            <LanguageSwitcher />
            <Link
              href="/login"
              className="text-sm text-foreground hover:text-primary transition-colors whitespace-nowrap"
            >
              {t("login")}
            </Link>
            <div className="flex items-center gap-2">
              <Button asChild size="sm">
                <Link href="/register">{t("getStarted")}</Link>
              </Button>
              <ThemeToggle />
            </div>
          </nav>

          {/* Mobile Navigation - Improved trigger positioning */}
          <div className="flex items-center gap-2 lg:hidden">
            <LanguageSwitcher />
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="flex-shrink-0">
                  <MenuIcon />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px]">
                <div className="flex flex-col gap-4 mt-8">
                  <Link
                    href="/report"
                    className="text-foreground hover:text-primary transition-colors p-2"
                    onClick={() => setIsOpen(false)}
                  >
                    {t("reportHazard")}
                  </Link>
                  <Link
                    href="/dashboard"
                    className="text-foreground hover:text-primary transition-colors p-2"
                    onClick={() => setIsOpen(false)}
                  >
                    {t("dashboard")}
                  </Link>
                  <Link
                    href="/safe-locations"
                    className="text-foreground hover:text-primary transition-colors p-2"
                    onClick={() => setIsOpen(false)}
                  >
                    {t("safeLocations")}
                  </Link>
                  <Link
                    href="/media"
                    className="text-foreground hover:text-primary transition-colors p-2"
                    onClick={() => setIsOpen(false)}
                  >
                    {t("mediaGallery")}
                  </Link>
                  <Link
                    href="/analytics"
                    className="text-foreground hover:text-primary transition-colors p-2"
                    onClick={() => setIsOpen(false)}
                  >
                    {t("analytics")}
                  </Link>
                  <Link
                    href="/community"
                    className="text-foreground hover:text-primary transition-colors p-2"
                    onClick={() => setIsOpen(false)}
                  >
                    {t("community")}
                  </Link>
                  {canAccessDashboard(user) && (
                    <Link
                      href="/admin"
                      className="text-foreground hover:text-primary transition-colors p-2"
                      onClick={() => setIsOpen(false)}
                    >
                      {t("admin")}
                    </Link>
                  )}
                  <Link
                    href="/login"
                    className="text-foreground hover:text-primary transition-colors p-2"
                    onClick={() => setIsOpen(false)}
                  >
                    {t("login")}
                  </Link>
                  <div className="mt-4 flex items-center gap-2">
                    <Button asChild>
                      <Link href="/register" onClick={() => setIsOpen(false)}>
                        {t("getStarted")}
                      </Link>
                    </Button>
                    <ThemeToggle />
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
