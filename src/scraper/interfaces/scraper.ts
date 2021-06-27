import { RanobeDomainData, Chapter } from '../entities';

export interface Scraper {
  extractDomainInfo(string): Promise<RanobeDomainData>;
  extractDomainInfoRule(string): RanobeDomainData;

  extractChapter(string): Promise<Chapter>;
  extractChapterRule(string): Chapter;

  getHostname(): string;
}
