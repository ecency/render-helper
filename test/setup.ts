import chai  from 'chai'
import * as snapshots from 'chai-snapshots'

export default () => {
  chai.use(snapshots.SnapshotMatchers({
    pathToSnaps: './test/snaps.json', //relative to project root
    ignoredAttributes: ['created_at', 'updated_at']
  }))
}

