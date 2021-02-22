import chai  from 'chai'
import * as snapshots from 'chai-snapshots'

export function setupJest(): void {
  chai.use(snapshots.SnapshotMatchers({
    pathToSnaps: './test/snaps.json', //relative to project root
    ignoredAttributes: ['created_at', 'updated_at']
  }))
}

