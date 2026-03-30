import { HeroSection } from './HeroSection';
import { ExecutiveSummarySection } from './ExecutiveSummarySection';
import { MethodologySection } from './MethodologySection';
import { ParetoSection } from './ParetoSection';
import { ClientProfileSection } from './ClientProfileSection';
import { CategorySection } from './CategorySection';
import { DriversSection } from './DriversSection';
import { RecommendationsSection } from './RecommendationsSection';
import { RemunerationSection } from './RemunerationSection';

type ReportSectionsProps = {
  printMode?: boolean;
};

export function ReportSections({ printMode = false }: ReportSectionsProps) {
  const animated = !printMode;

  return (
    <>
      <HeroSection printMode={printMode} />
      <ExecutiveSummarySection animated={animated} />
      <MethodologySection animated={animated} />
      <ParetoSection animated={animated} />
      <ClientProfileSection animated={animated} />
      <CategorySection animated={animated} />
      <DriversSection animated={animated} />
      <RecommendationsSection animated={animated} />
      <RemunerationSection animated={animated} />
    </>
  );
}
