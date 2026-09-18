import { ExploreTree } from "@/components/ExploreTree";

export default function ExplorePage() {
  return (
    <div className="px-4 py-4 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text-primary mb-1">Explore</h1>
        <p className="text-text-secondary text-sm">
          Expand a conference to browse teams, or open a team hub.
        </p>
      </div>
      <ExploreTree />
    </div>
  );
}
