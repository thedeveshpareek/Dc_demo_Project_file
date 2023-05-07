package com.multipixeltec.dcservice.dto;

import com.multipixeltec.dcservice.model.PackageItem;
import lombok.Data;

import java.io.Serializable;

/**
 * A DTO for the {@link PackageItem} entity
 */
@Data
public class PackageItemDto implements Serializable {
    private Long id;
    private Long pkgId;
    private String pkgName;
    private Long testId;
    private String testName;
}
