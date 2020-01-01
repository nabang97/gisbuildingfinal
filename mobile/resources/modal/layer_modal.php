<!-- Modal LAYER-->
    <div class="modal fade" id="myLayerModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalScrollableTitle" aria-hidden="true">
      <div class="modal-dialog modal-dialog-scrollable" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="myLayerModal" style="font-size:15px">Map Layer</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body" id="modalContent" style="font-size:12px">
            <div class="form-check">
              <input class="form-check-input" type="checkbox" value="" id="allLayer" checked>
              <label class="form-check-label" for="defaultCheck1">
                Show All
              </label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="checkbox" value="" id="nagari-layer" checked>
              <label class="form-check-label" for="defaultCheck1">
                Nagari Border
              </label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="checkbox" value="" id="jorong-layer" checked>
              <label class="form-check-label" for="defaultCheck1">
                Jorong Area
              </label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="checkbox" value="" id="house-layer" checked>
              <label class="form-check-label" for="defaultCheck1">
                House Building
              </label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="checkbox" value="" id="msme-layer" checked>
              <label class="form-check-label" for="defaultCheck1">
                MSME Building
              </label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="checkbox" value="" id="education-layer" checked>
              <label class="form-check-label" for="defaultCheck1">
                educational Building
              </label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="checkbox" value="" id="office-layer" checked>
              <label class="form-check-label" for="defaultCheck1">
                Office Building
              </label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="checkbox" value="" id="health-layer" checked>
              <label class="form-check-label" for="defaultCheck1">
                Health Building
              </label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="checkbox" value="" id="worship-layer" checked>
              <label class="form-check-label" for="defaultCheck1">
                Worship Building
              </label>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal" style="font-size:12px">Close</button>
            <button type="button" class="btn btn-primary" style="font-size:12px" onclick="checkAllLayer()">Save changes</button>
          </div>
        </div>
      </div>
    </div>
